import { createTRPCClient, httpLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@/server/trpc/router";

export const trpc = createTRPCClient<AppRouter>({
  links: [httpLink({ url: "/api/trpc", transformer: superjson })],
});
