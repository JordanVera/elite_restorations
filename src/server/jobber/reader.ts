import "server-only";

import { jobberGraphql, type Connection, type JobberRequestOptions } from "@/server/jobber/graphql";
import { MOCK_CLIENTS, MOCK_QUOTES } from "@/server/jobber/fixtures";
import {
  CLIENT_PAGE_SIZE,
  CLIENT_QUERY,
  CLIENTS_PAGE_QUERY,
  LINE_ITEMS_PER_QUOTE,
  QUOTE_LINE_ITEMS_QUERY,
  QUOTE_PAGE_SIZE,
  QUOTE_QUERY,
  QUOTES_PAGE_QUERY,
} from "@/server/jobber/queries";
import type { ClientNode, LineItemNode, QuoteNode } from "@/server/jobber/read-map";

/** Source of Jobber records. The live and mock readers feed the same sync code. */
export interface JobberReader {
  readonly source: "JOBBER" | "MOCK";
  clientsPage(after: string | null): Promise<Connection<ClientNode>>;
  quotesPage(after: string | null): Promise<Connection<QuoteNode>>;
  quoteLineItemsPage(quoteId: string, after: string | null): Promise<Connection<LineItemNode>>;
  client(id: string): Promise<ClientNode | null>;
  quote(id: string): Promise<QuoteNode | null>;
}

export function liveReader(options: JobberRequestOptions = {}): JobberReader {
  const request = { retries: 4, timeoutMs: 15_000, ...options };
  return {
    source: "JOBBER",
    async clientsPage(after) {
      const data = await jobberGraphql<{ clients: Connection<ClientNode> }>(CLIENTS_PAGE_QUERY, { first: CLIENT_PAGE_SIZE, after }, request);
      return data.clients;
    },
    async quotesPage(after) {
      const data = await jobberGraphql<{ quotes: Connection<QuoteNode> }>(QUOTES_PAGE_QUERY, { first: QUOTE_PAGE_SIZE, after }, request);
      return data.quotes;
    },
    async quoteLineItemsPage(quoteId, after) {
      const data = await jobberGraphql<{ quote: { lineItems: Connection<LineItemNode> } | null }>(
        QUOTE_LINE_ITEMS_QUERY,
        { id: quoteId, first: LINE_ITEMS_PER_QUOTE, after },
        request,
      );
      return data.quote?.lineItems ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
    },
    async client(id) {
      const data = await jobberGraphql<{ client: ClientNode | null }>(CLIENT_QUERY, { id }, request);
      return data.client;
    },
    async quote(id) {
      const data = await jobberGraphql<{ quote: QuoteNode | null }>(QUOTE_QUERY, { id }, request);
      return data.quote;
    },
  };
}

function page<T>(items: T[], after: string | null, size: number): Connection<T> {
  const start = after ? Number(after) : 0;
  const nodes = items.slice(start, start + size);
  const end = start + nodes.length;
  return { nodes, pageInfo: { hasNextPage: end < items.length, endCursor: end < items.length ? String(end) : null } };
}

/** Serves the fixtures in small pages so the pagination path is exercised too. */
export function mockReader(pageSize = 2): JobberReader {
  return {
    source: "MOCK",
    async clientsPage(after) {
      return page(MOCK_CLIENTS, after, pageSize);
    },
    async quotesPage(after) {
      return page(MOCK_QUOTES, after, pageSize);
    },
    async quoteLineItemsPage(quoteId, after) {
      const quote = MOCK_QUOTES.find((q) => q.id === quoteId);
      return page(quote?.lineItems?.nodes ?? [], after, LINE_ITEMS_PER_QUOTE);
    },
    async client(id) {
      return MOCK_CLIENTS.find((c) => c.id === id) ?? null;
    },
    async quote(id) {
      return MOCK_QUOTES.find((q) => q.id === id) ?? null;
    },
  };
}
