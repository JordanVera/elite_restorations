import "server-only";

import type { DeliverableLead } from "@/server/leads/types";
import { jobberCredentialsReady } from "@/server/jobber/config";
import { assertNoUserErrors, jobberGraphql } from "@/server/jobber/graphql";
import { addressForJobber, buildClientInput, buildRequestInput, phoneLast10, type EstimateForJobber } from "@/server/jobber/map";

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

function safeError(error: unknown): string {
  const message = error instanceof Error ? error.message : "unknown error";
  return message
    .replace(/bearer\s+\S+/gi, "bearer [redacted]")
    .replace(/eyJ[\w.-]+/g, "[redacted]")
    .slice(0, 300);
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

function matchesLead(node: ClientNode, lead: EstimateForJobber): boolean {
  const email = lead.email.trim().toLowerCase();
  if (email && node.emails?.some((item) => item.address.trim().toLowerCase() === email)) return true;
  const phone = phoneLast10(lead.phone);
  if (!phone) return false;
  return Boolean(
    node.phones?.some((item) => phoneLast10(item.normalizedPhoneNumber || item.number || "") === phone),
  );
}

async function searchClients(term: string): Promise<ClientNode[]> {
  const data = await jobberGraphql<{ clients: { nodes: ClientNode[] } }>(FIND_CLIENTS, { searchTerm: term });
  return data.clients.nodes ?? [];
}

async function findClient(lead: EstimateForJobber): Promise<ClientNode | null> {
  const terms = [lead.email.trim(), lead.phone.trim()].filter(Boolean);
  for (const term of terms) {
    const nodes = await searchClients(term);
    const match = nodes.find((node) => matchesLead(node, lead));
    if (match) return match;
  }
  return null;
}

async function createClient(lead: EstimateForJobber): Promise<ClientNode> {
  const data = await jobberGraphql<{
    clientCreate: { client: ClientNode | null; userErrors: { message: string; path?: string[] }[] };
  }>(CREATE_CLIENT, { input: buildClientInput(lead) });
  assertNoUserErrors("Client", data.clientCreate.userErrors);
  if (!data.clientCreate.client?.id) throw new Error("Jobber did not return a client id.");
  return data.clientCreate.client;
}

async function ensureProperty(client: ClientNode, lead: EstimateForJobber): Promise<string | undefined> {
  const existing = client.clientProperties?.nodes?.[0]?.id;
  if (existing) return existing;
  try {
    const data = await jobberGraphql<{
      propertyCreate: { properties: { id: string }[] | null; userErrors: { message: string }[] };
    }>(CREATE_PROPERTY, {
      clientId: client.id,
      input: { properties: [{ address: addressForJobber(lead.address) }] },
    });
    assertNoUserErrors("Property", data.propertyCreate.userErrors);
    return data.propertyCreate.properties?.[0]?.id;
  } catch (error) {
    console.error("[jobber] property was not added", safeError(error));
    return undefined;
  }
}

export async function syncEstimateToJobber(lead: DeliverableLead): Promise<JobberSyncResult> {
  const estimate = asEstimate(lead);
  if (!estimate) return { status: "skipped" };
  if (!jobberCredentialsReady()) return { status: "not-configured" };

  try {
    const client = (await findClient(estimate)) ?? (await createClient(estimate));
    const propertyId = await ensureProperty(client, estimate);
    const data = await jobberGraphql<{
      requestCreate: { request: { id: string } | null; userErrors: { message: string }[] };
    }>(CREATE_REQUEST, { input: buildRequestInput(estimate, client.id, propertyId) });
    assertNoUserErrors("Request", data.requestCreate.userErrors);
    if (!data.requestCreate.request?.id) throw new Error("Jobber did not return a request id.");
    console.info("[jobber] estimate saved");
    return { status: "created" };
  } catch (error) {
    const message = safeError(error);
    if (
      message === "Jobber is not connected." ||
      message === "Jobber token store is not configured." ||
      message === "Jobber credentials are not configured."
    ) {
      console.info("[jobber]", message);
      return { status: "not-configured" };
    }
    console.error("[jobber] sync failed", message);
    return { status: "failed" };
  }
}
