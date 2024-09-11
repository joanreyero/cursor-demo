import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getTopics: publicProcedure.query(async ({ ctx }) => {
    const topics = await ctx.db.topic.findMany({
      orderBy: { name: "asc" },
    });
    return topics;
  }),
});
