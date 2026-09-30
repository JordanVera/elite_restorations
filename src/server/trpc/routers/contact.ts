import "server-only";

import { TRPCError } from "@trpc/server";

import { leadSchema } from "@/lib/inquiry-schema";
import { deliverLead } from "@/server/delivery";
import { resolveLead } from "@/server/leads/resolve";
import { isRateLimited } from "@/server/rate-limit";
import { publicProcedure, router } from "@/server/trpc/init";

export const contactRouter = router({
  submit: publicProcedure.input(leadSchema).mutation(async ({ input, ctx }) => {
    if (isRateLimited(`inquiry:${ctx.ip}`)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please wait a few minutes or call us.",
      });
    }

    const lead = await resolveLead(input);
    const result = await deliverLead(lead);

    if (result.status === "delivered") {
      return { delivered: true as const, photosSaved: lead.photos.length, photosMissing: lead.photosMissing };
    }

    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message:
        result.status === "not-configured"
          ? "Online requests are not switched on yet."
          : "We could not send your request.",
    });
  }),
});
