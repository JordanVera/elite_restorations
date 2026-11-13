import "server-only";

import { TRPCError } from "@trpc/server";

import { leadSchema } from "@/lib/inquiry-schema";
import { submitTiming } from "@/lib/lead-timing";
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

    if (input.website.trim()) {
      console.info("[leads] dropped honeypot submission");
      return { delivered: true as const, photosSaved: 0, photosMissing: 0 };
    }

    const timing = submitTiming(input.startedAt);
    if (timing !== "ok") {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: timing === "expired" ? "expired" : "too-fast",
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
