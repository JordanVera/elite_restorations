import "server-only";

import type { DeliverableLead } from "@/server/leads/types";
import { jobberCredentialsReady } from "@/server/jobber/config";
import { assertNoUserErrors, jobberGraphql } from "@/server/jobber/graphql";
import {
  addressForJobber,
  buildClientInput,
  buildContactClientInput,
  buildInboundRequestInput,
  buildRequestInput,
  formatUsPhone,
  splitPhoneExtension,
  type EstimateForJobber,
  type JobberIngestLead,
} from "@/server/jobber/map";
import { clientSearchTerms, matchesLead } from "@/server/jobber/match";
import { JOBBER_TOKEN_STORE_MISSING } from "@/server/jobber/tokens";
import { PRIVATE_BLOB_MISSING } from "@/server/private-blob-token";
import { safeLog } from "@/server/safe-log";

export type JobberSyncResult =
  | { status: "created" }
  | { status: "skipped" }
  | { status: "not-configured" }
  | { status: "failed" };

type ClientNode = {
  id: string;
  emails?: { address: string }[];
  phones?: { number?: string | null; normalizedPhoneNumber?: string | null }[];
  clientProperties?: { nodes: { id: string }[] };
};

const FIND_CLIENTS = `
  query FindClients($searchTerm: String!) {
    clients(searchTerm: $searchTerm, first: 10) {
      nodes {
        id
        emails { address }
        phones { number normalizedPhoneNumber }
        clientProperties(first: 1) { nodes { id } }
      }
    }
  }
`;

const CREATE_CLIENT = `
  mutation CreateClient($input: ClientCreateInput!) {
    clientCreate(input: $input) {
      client {
        id
        clientProperties(first: 1) { nodes { id } }
      }
      userErrors { message path }
    }
  }
`;

const CREATE_PROPERTY = `
  mutation CreateProperty($clientId: EncodedId!, $input: PropertyCreateInput!) {
    propertyCreate(clientId: $clientId, input: $input) {
      properties { id }
      userErrors { message path }
    }
  }
`;

const CREATE_REQUEST = `
  mutation CreateRequest($input: RequestCreateInput!) {
    requestCreate(input: $input) {
      request { id }
      userErrors { message path }
    }
  }
`;

function leadName(name: string | undefined, phone: string | undefined): string {
  const trimmed = name?.trim() ?? "";
  if (trimmed) return trimmed;
  return formatUsPhone(phone ?? "") || "New lead";
}

function asEstimate(lead: DeliverableLead): EstimateForJobber | null {
  if (lead.path !== "estimate") return null;
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    address: lead.address,
    service: lead.service,
    claim: lead.claim,
    carrier: lead.carrier,
    contactMethod: lead.contactMethod,
    message: lead.message,
    pageUrl: lead.pageUrl,
  };
}

async function searchClients(term: string): Promise<ClientNode[]> {
  const data = await jobberGraphql<{ clients: { nodes: ClientNode[] } }>(FIND_CLIENTS, { searchTerm: term });
  return data.clients.nodes ?? [];
}

async function findClient(lead: { email?: string | null; phone?: string | null }): Promise<ClientNode | null> {
  for (const term of clientSearchTerms(lead)) {
    const nodes = await searchClients(term);
    const match = nodes.find((node) => matchesLead(node, lead));
    if (match) return match;
  }
  return null;
}

async function createClientFromInput(input: ReturnType<typeof buildContactClientInput>): Promise<ClientNode> {
  const data = await jobberGraphql<{
    clientCreate: { client: ClientNode | null; userErrors: { message: string; path?: string[] }[] };
  }>(CREATE_CLIENT, { input });
  assertNoUserErrors("Client", data.clientCreate.userErrors);
  if (!data.clientCreate.client?.id) throw new Error("Jobber did not return a client id.");
  return data.clientCreate.client;
}

async function ensureProperty(client: ClientNode, address: string): Promise<string | undefined> {
  const trimmed = address.trim();
  if (!trimmed) return undefined;
  const existing = client.clientProperties?.nodes?.[0]?.id;
  if (existing) return existing;
  try {
    const data = await jobberGraphql<{
      propertyCreate: { properties: { id: string }[] | null; userErrors: { message: string }[] };
    }>(CREATE_PROPERTY, {
      clientId: client.id,
      input: { properties: [{ address: addressForJobber(trimmed) }] },
    });
    assertNoUserErrors("Property", data.propertyCreate.userErrors);
    return data.propertyCreate.properties?.[0]?.id;
  } catch (error) {
    console.error("[jobber] property was not added", safeLog(error));
    return undefined;
  }
}

async function createRequest(input: ReturnType<typeof buildRequestInput>): Promise<void> {
  const data = await jobberGraphql<{
    requestCreate: { request: { id: string } | null; userErrors: { message: string }[] };
  }>(CREATE_REQUEST, { input });
  assertNoUserErrors("Request", data.requestCreate.userErrors);
  if (!data.requestCreate.request?.id) throw new Error("Jobber did not return a request id.");
}

function fromJobberError(error: unknown): JobberSyncResult {
  const message = safeLog(error);
  if (
    message === "Jobber is not connected." ||
    message === JOBBER_TOKEN_STORE_MISSING ||
    message === PRIVATE_BLOB_MISSING ||
    message === "Jobber credentials are not configured."
  ) {
    console.info("[jobber]", message);
    return { status: "not-configured" };
  }
  console.error("[jobber] sync failed", message);
  return { status: "failed" };
}

export async function syncEstimateToJobber(lead: DeliverableLead): Promise<JobberSyncResult> {
  const estimate = asEstimate(lead);
  if (!estimate) return { status: "skipped" };
  if (!jobberCredentialsReady()) return { status: "not-configured" };

  try {
    const client = (await findClient(estimate)) ?? (await createClientFromInput(buildClientInput(estimate)));
    const propertyId = await ensureProperty(client, estimate.address);
    await createRequest(buildRequestInput(estimate, client.id, propertyId));
    console.info("[jobber] estimate saved");
    return { status: "created" };
  } catch (error) {
    return fromJobberError(error);
  }
}

/**
 * Creates a Jobber client and request for a lead that is not the website form.
 * Service and claim stay free text. Source is a form answer, same as the website request.
 * A property is added only when an address or city is present.
 */
export async function ingestLeadToJobber(lead: JobberIngestLead): Promise<JobberSyncResult> {
  if (!jobberCredentialsReady()) return { status: "not-configured" };
  const split = splitPhoneExtension(lead.phone ?? "");
  const phone = split.phone;
  const contact = {
    name: leadName(lead.name, phone),
    email: lead.email?.trim() ?? "",
    phone,
    address: lead.address?.trim() ?? "",
    smsAllowed: Boolean(lead.smsAllowed),
  };

  try {
    const client = (await findClient(contact)) ?? (await createClientFromInput(buildContactClientInput(contact)));
    const propertyId = contact.address ? await ensureProperty(client, contact.address) : undefined;
    await createRequest(
      buildInboundRequestInput({
        clientId: client.id,
        propertyId,
        title: lead.title,
        sourceLabel: lead.sourceLabel,
        notes: lead.notes,
      }),
    );
    console.info("[jobber] inbound saved", lead.sourceLabel);
    return { status: "created" };
  } catch (error) {
    return fromJobberError(error);
  }
}
