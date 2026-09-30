import "server-only";

import { TRPCError } from "@trpc/server";

import { inquirySchema } from "@/lib/inquiry-schema";
import { deliverInquiry } from "@/server/delivery";
import { isRateLimited } from "@/server/rate-limit";
import { publicProcedure, router } from "@/server/trpc/init";

export const contactRouter = router({
  submit: publicProcedure.input(inquirySchema).mutation(async ({ input, ctx }) => {
    if (isRateLimited(`inquiry:${ctx.ip}`)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please wait a few minutes or call us.",
      });
    }

    const result = await deliverInquiry(input);

    if (result.status === "delivered") return { delivered: true as const };

    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message:
        result.status === "not-configured"
          ? "Online requests are not switched on yet."
          : "We could not send your request.",
    });
  }),
});
