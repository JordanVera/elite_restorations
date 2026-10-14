import "server-only";

import { contactRouter } from "@/server/trpc/routers/contact";
import { opportunitiesRouter } from "@/server/trpc/routers/opportunities";
import { router } from "@/server/trpc/init";

export const appRouter = router({
  contact: contactRouter,
  opportunities: opportunitiesRouter,
});

export type AppRouter = typeof appRouter;
