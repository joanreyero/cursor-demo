import { repoRouter } from "~/server/api/routers/repo";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { topicRouter } from "~/server/api/routers/topic";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  repo: repoRouter,
  topic: topicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
