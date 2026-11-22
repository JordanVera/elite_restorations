import "server-only";

import { JOBBER_GRAPHQL_URL, jobberGraphqlVersion } from "@/server/jobber/config";
import { expireJobberAccessToken, getJobberAccessToken } from "@/server/jobber/tokens";

type GraphQLError = { message?: string; extensions?: { code?: string } };

/** extensions.cost, as documented in Jobber's API rate limit guide. */
export type JobberCost = {
  requestedQueryCost?: number;
  actualQueryCost?: number;
  throttleStatus?: { maximumAvailable?: number; currentlyAvailable?: number; restoreRate?: number };
};

type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[]; extensions?: { cost?: JobberCost } };

export type JobberRequestOptions = {
  /** Retries for throttling, 429, 5xx, and network errors. */
  retries?: number;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
  /** Called after every successful response with the cost block, so callers can pace themselves. */
  onCost?: (cost: JobberCost) => void;
};

export class JobberApiError extends Error {
  readonly status: number;
  readonly retryable: boolean;

  constructor(message: string, status: number, retryable: boolean) {
    super(message);
    this.name = "JobberApiError";
    this.status = status;
    this.retryable = retryable;
  }
}

const MAX_WAIT_MS = 20_000;
const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Exponential backoff with jitter: ~0.5s, 1s, 2s, 4s, capped. */
export function backoffMs(attempt: number, random = Math.random): number {
  const base = 500 * 2 ** attempt;
  return Math.min(MAX_WAIT_MS, Math.round(base * (0.75 + random() * 0.5)));
}

/** How long until enough points are restored for the throttled query to run. */
export function throttleWaitMs(cost: JobberCost | undefined): number {
  const status = cost?.throttleStatus;
  const requested = cost?.requestedQueryCost ?? 0;
  const available = status?.currentlyAvailable ?? 0;
  const rate = status?.restoreRate && status.restoreRate > 0 ? status.restoreRate : 500;
  const deficit = Math.max(0, requested - available);
  return Math.min(MAX_WAIT_MS, Math.ceil(deficit / rate) * 1000 + 250);
}

function isThrottled(body: GraphQLResponse<unknown>): boolean {
  return Boolean(body.errors?.some((error) => error.extensions?.code === "THROTTLED" || error.message === "Throttled"));
}

async function postGraphQL<T>(query: string, variables: Record<string, unknown>, accessToken: string, timeoutMs: number) {
  const response = await fetch(JOBBER_GRAPHQL_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      "x-jobber-graphql-version": jobberGraphqlVersion(),
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  const body = (await response.json().catch(() => ({}))) as GraphQLResponse<T>;
  return { status: response.status, body };
}

function readData<T>(result: { status: number; body: GraphQLResponse<T> }): T {
  if (result.status === 401) throw new JobberApiError("Jobber rejected the access token.", 401, false);
  if (!result.body.data) {
    const message = result.body.errors?.map((error) => error.message).filter(Boolean).join("; ");
    throw new JobberApiError(message || `Jobber request failed (${result.status}).`, result.status, false);
  }
  if (result.body.errors?.length) {
    throw new JobberApiError(
      result.body.errors.map((error) => error.message || "Jobber request failed.").join("; "),
      result.status,
      false,
    );
  }
  return result.body.data;
}

/**
 * One GraphQL request with token refresh on 401, throttle waits on THROTTLED,
 * and backoff on 429, 5xx, and network failures.
 */
export async function jobberGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
  options: JobberRequestOptions = {},
): Promise<T> {
  const retries = options.retries ?? 2;
  const sleep = options.sleep ?? defaultSleep;
  const timeoutMs = options.timeoutMs ?? 8000;
  let refreshedAfter401 = false;

  for (let attempt = 0; ; attempt += 1) {
    let result: { status: number; body: GraphQLResponse<T> };
    try {
      result = await postGraphQL<T>(query, variables, await getJobberAccessToken(), timeoutMs);
    } catch (error) {
      const network = error instanceof TypeError || (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError"));
      if (network && attempt < retries) {
        await sleep(backoffMs(attempt));
        continue;
      }
      throw error;
    }

    if (result.status === 401 && !refreshedAfter401) {
      refreshedAfter401 = true;
      expireJobberAccessToken();
      attempt -= 1;
      continue;
    }

    if (isThrottled(result.body)) {
      if (attempt >= retries) throw new JobberApiError("Jobber is throttling requests. Try again shortly.", 429, true);
      await sleep(throttleWaitMs(result.body.extensions?.cost));
      continue;
    }

    if (result.status === 429 || result.status >= 500) {
      if (attempt >= retries) throw new JobberApiError(`Jobber is unavailable (${result.status}).`, result.status, true);
      await sleep(backoffMs(attempt));
      continue;
    }

    const data = readData(result);
    if (result.body.extensions?.cost) options.onCost?.(result.body.extensions.cost);
    return data;
  }
}

export type PageInfo = { hasNextPage: boolean; endCursor: string | null };
export type Connection<N> = { nodes: N[]; pageInfo: PageInfo };

/**
 * Walks a cursor-paginated connection. `pick` returns the connection from the
 * response. Stops after maxPages so a single call stays within a function's
 * time limit; the returned cursor resumes from there.
 */
export async function paginate<T, N>(
  query: string,
  variables: Record<string, unknown>,
  pick: (data: T) => Connection<N>,
  options: JobberRequestOptions & { startCursor?: string | null; maxPages?: number; onPage?: (nodes: N[]) => Promise<void> | void } = {},
): Promise<{ nodes: N[]; cursor: string | null; done: boolean; pages: number }> {
  const nodes: N[] = [];
  let cursor = options.startCursor ?? null;
  const maxPages = options.maxPages ?? Number.POSITIVE_INFINITY;
  let pages = 0;
  while (pages < maxPages) {
    const data = await jobberGraphql<T>(query, { ...variables, after: cursor }, options);
    const connection = pick(data);
    pages += 1;
    nodes.push(...connection.nodes);
    await options.onPage?.(connection.nodes);
    if (!connection.pageInfo.hasNextPage || !connection.pageInfo.endCursor) {
      return { nodes, cursor: null, done: true, pages };
    }
    cursor = connection.pageInfo.endCursor;
  }
  return { nodes, cursor, done: false, pages };
}

export function assertNoUserErrors(label: string, userErrors: { message: string; path?: string[] }[] | undefined) {
  if (!userErrors?.length) return;
  const detail = userErrors
    .map((error) => error.message)
    .filter(Boolean)
    .join("; ")
    .slice(0, 300);
  throw new Error(`${label} was rejected${detail ? `: ${detail}` : "."}`);
}
