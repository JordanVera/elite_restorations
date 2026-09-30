import "server-only";

import { contactRouter } from "@/server/trpc/routers/contact";
import { router } from "@/server/trpc/init";

export const appRouter = router({
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
