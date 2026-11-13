import "server-only";

import { JOBBER_GRAPHQL_URL, jobberGraphqlVersion } from "@/server/jobber/config";
import { expireJobberAccessToken, getJobberAccessToken } from "@/server/jobber/tokens";

type GraphQLError = { message?: string };
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] };

export async function jobberGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const first = await postGraphQL<T>(query, variables, await getJobberAccessToken());
  if (first.status !== 401) return readData(first);
  expireJobberAccessToken();
  const second = await postGraphQL<T>(query, variables, await getJobberAccessToken());
  return readData(second);
}

async function postGraphQL<T>(query: string, variables: Record<string, unknown>, accessToken: string) {
  const response = await fetch(JOBBER_GRAPHQL_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      "x-jobber-graphql-version": jobberGraphqlVersion(),
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(8000),
  });
  const body = (await response.json().catch(() => ({}))) as GraphQLResponse<T>;
  return { status: response.status, body };
}

function readData<T>(result: { status: number; body: GraphQLResponse<T> }): T {
  if (result.status === 401) throw new Error("Jobber rejected the access token.");
  if (!result.body.data) {
    const message = result.body.errors?.map((error) => error.message).filter(Boolean).join("; ");
    throw new Error(message || `Jobber request failed (${result.status}).`);
  }
  if (result.body.errors?.length) {
    throw new Error(result.body.errors.map((error) => error.message || "Jobber request failed.").join("; "));
  }
  return result.body.data;
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
