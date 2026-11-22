/**
 * Read-only Jobber queries for the admin dashboard.
 *
 * Every field below was checked against Jobber's published object reference
 * (developer.getjobber.com/docs) and the GraphQL introspection schema for API
 * version 2025-04-16. The "Check schema" button on /admin/settings/integrations
 * re-runs that check against the live API (see REQUIRED_FIELDS).
 *
 * Page sizes keep requestedQueryCost well under the 10,000 point bucket:
 * connection cost = first × fields, nested connections multiply.
 */

export const CLIENT_PAGE_SIZE = 50;
export const QUOTE_PAGE_SIZE = 10;
export const LINE_ITEMS_PER_QUOTE = 50;

export const ACCOUNT_QUERY = `
  query AdminAccount {
    account { id name }
  }
`;

const CLIENT_FIELDS = `
  id
  name
  companyName
  isCompany
  email
  phone
  jobberWebUri
  updatedAt
  clientProperties(first: 1) {
    nodes { address { street city province postalCode } }
  }
`;

export const CLIENTS_PAGE_QUERY = `
  query AdminClientsPage($first: Int!, $after: String) {
    clients(first: $first, after: $after, sort: { key: UPDATED_AT, direction: DESCENDING }) {
      nodes { ${CLIENT_FIELDS} }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export const CLIENT_QUERY = `
  query AdminClient($id: EncodedId!) {
    client(id: $id) { ${CLIENT_FIELDS} }
  }
`;

const QUOTE_FIELDS = `
  id
  quoteNumber
  quoteStatus
  title
  createdAt
  updatedAt
  jobberWebUri
  amounts { total }
  client { id name companyName isCompany email phone jobberWebUri }
  property { address { street city province postalCode } }
  lineItems(first: ${LINE_ITEMS_PER_QUOTE}) {
    nodes { id name description quantity unitPrice totalPrice }
    pageInfo { hasNextPage endCursor }
  }
`;

export const QUOTES_PAGE_QUERY = `
  query AdminQuotesPage($first: Int!, $after: String) {
    quotes(first: $first, after: $after, sort: [{ key: CREATED_AT, direction: DESCENDING }]) {
      nodes { ${QUOTE_FIELDS} }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export const QUOTE_QUERY = `
  query AdminQuote($id: EncodedId!) {
    quote(id: $id) { ${QUOTE_FIELDS} }
  }
`;

export const QUOTE_LINE_ITEMS_QUERY = `
  query AdminQuoteLineItems($id: EncodedId!, $first: Int!, $after: String) {
    quote(id: $id) {
      lineItems(first: $first, after: $after) {
        nodes { id name description quantity unitPrice totalPrice }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

/** Fields this module selects, per type. The live schema check confirms each one exists. */
export const REQUIRED_FIELDS: Record<string, string[]> = {
  Account: ["id", "name"],
  Client: ["id", "name", "companyName", "isCompany", "email", "phone", "jobberWebUri", "updatedAt", "clientProperties"],
  Property: ["address"],
  PropertyAddress: ["street", "city", "province", "postalCode"],
  Quote: ["id", "quoteNumber", "quoteStatus", "title", "createdAt", "updatedAt", "jobberWebUri", "amounts", "client", "property", "lineItems"],
  QuoteAmounts: ["total"],
  QuoteLineItem: ["id", "name", "description", "quantity", "unitPrice", "totalPrice"],
};

export const SCHEMA_CHECK_QUERY = `
  query AdminSchemaCheck {
    ${Object.keys(REQUIRED_FIELDS)
      .map((type) => `t${type}: __type(name: "${type}") { name fields { name } }`)
      .join("\n    ")}
  }
`;

export function missingSchemaFields(
  result: Record<string, { name: string; fields: { name: string }[] | null } | null>,
): string[] {
  const missing: string[] = [];
  for (const [type, fields] of Object.entries(REQUIRED_FIELDS)) {
    const found = result[`t${type}`];
    if (!found?.fields) {
      missing.push(`${type} (type not found)`);
      continue;
    }
    const names = new Set(found.fields.map((field) => field.name));
    for (const field of fields) if (!names.has(field)) missing.push(`${type}.${field}`);
  }
  return missing;
}

/** QuoteStatusTypeEnum values from the schema. */
export const QUOTE_STATUSES = ["draft", "awaiting_response", "changes_requested", "approved", "converted", "archived"] as const;

export function quoteStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "Draft",
    awaiting_response: "Awaiting response",
    changes_requested: "Changes requested",
    approved: "Approved",
    converted: "Converted",
    archived: "Archived",
  };
  return labels[status] ?? status.replace(/_/g, " ");
}
