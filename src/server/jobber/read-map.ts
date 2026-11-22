/** Maps Jobber GraphQL nodes to local rows. Pure, so mapping is unit tested without a database. */

import type { Connection } from "@/server/jobber/graphql";

export type AddressNode = {
  street?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
} | null;

export type ClientNode = {
  id: string;
  name: string;
  companyName?: string | null;
  isCompany?: boolean | null;
  email?: string | null;
  phone?: string | null;
  jobberWebUri?: string | null;
  updatedAt?: string | null;
  clientProperties?: { nodes: { address: AddressNode }[] } | null;
};

export type LineItemNode = {
  id: string;
  name: string;
  description?: string | null;
  quantity?: number | null;
  unitPrice?: number | null;
  totalPrice?: number | null;
};

export type QuoteNode = {
  id: string;
  quoteNumber: string;
  quoteStatus: string;
  title?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  jobberWebUri?: string | null;
  amounts?: { total?: number | null } | null;
  client?: ClientNode | null;
  property?: { address: AddressNode } | null;
  lineItems?: Connection<LineItemNode> | null;
};

export type ClientRow = {
  jobberId: string;
  name: string;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  jobberWebUri: string | null;
};

export type QuoteRow = {
  jobberId: string;
  clientJobberId: string;
  quoteNumber: string;
  title: string | null;
  status: string;
  quoteDate: Date | null;
  total: number | null;
  propertyAddress: string | null;
  jobberWebUri: string | null;
};

export type LineItemRow = {
  jobberId: string;
  name: string;
  description: string | null;
  quantity: number | null;
  unitPrice: number | null;
  totalPrice: number | null;
  sortOrder: number;
};

function clean(value: string | null | undefined, max = 500): string | null {
  const trimmed = value?.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function formatAddress(address: AddressNode | undefined): string | null {
  if (!address) return null;
  const region = [address.province, address.postalCode].map((part) => clean(part)).filter(Boolean).join(" ");
  const parts = [clean(address.street), clean(address.city), region || null].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function finiteOrNull(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function mapClient(node: ClientNode): ClientRow {
  const company = clean(node.companyName);
  return {
    jobberId: node.id,
    name: clean(node.name, 200) ?? company ?? "Unnamed client",
    companyName: company,
    email: clean(node.email, 254)?.toLowerCase() ?? null,
    phone: clean(node.phone, 40),
    address: formatAddress(node.clientProperties?.nodes?.[0]?.address),
    jobberWebUri: clean(node.jobberWebUri, 500),
  };
}

export function mapLineItems(nodes: LineItemNode[], offset = 0): LineItemRow[] {
  return nodes.map((item, index) => ({
    jobberId: item.id,
    name: clean(item.name, 300) ?? "Line item",
    description: item.description?.trim() ? item.description.trim().slice(0, 4000) : null,
    quantity: finiteOrNull(item.quantity),
    unitPrice: finiteOrNull(item.unitPrice),
    totalPrice: finiteOrNull(item.totalPrice),
    sortOrder: offset + index,
  }));
}

export function mapQuote(node: QuoteNode): { quote: QuoteRow; client: ClientRow | null; lineItems: LineItemRow[]; moreLineItems: string | null } {
  if (!node.client?.id) throw new Error(`Quote ${node.quoteNumber} has no client.`);
  return {
    quote: {
      jobberId: node.id,
      clientJobberId: node.client.id,
      quoteNumber: String(node.quoteNumber),
      title: clean(node.title, 300),
      status: node.quoteStatus,
      quoteDate: parseDate(node.createdAt),
      total: finiteOrNull(node.amounts?.total),
      propertyAddress: formatAddress(node.property?.address),
      jobberWebUri: clean(node.jobberWebUri, 500),
    },
    client: node.client.name ? mapClient(node.client) : null,
    lineItems: mapLineItems(node.lineItems?.nodes ?? []),
    moreLineItems: node.lineItems?.pageInfo.hasNextPage ? node.lineItems.pageInfo.endCursor : null,
  };
}
