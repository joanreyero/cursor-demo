import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Repo } from "@prisma/client";
import { GraphQLClient } from "graphql-request";

const githubClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
});

export const repoRouter = createTRPCRouter({
  createReposForTopic: publicProcedure
    .input(z.object({ topic: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const query = `
        query($topic: String!) {
          search(query: $topic, type: REPOSITORY, first: 50) {
            edges {
              node {
                ... on Repository {
                  name
                  url
                  stargazerCount
                  forkCount
                  issues(states: OPEN) { totalCount }
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        committedDate
                      }
                    }
                  }
                  createdAt
                }
              }
            }
          }
        }
      `;

      const variables = { topic: input.topic };
      const data = await githubClient.request<{
        search: {
          edges: Array<{
            node: {
              name: string;
              url: string;
              stargazerCount: number;
              forkCount: number;
              issues: { totalCount: number };
              defaultBranchRef: { target: { committedDate: string } };
              createdAt: string;
            };
          }>;
        };
      }>(query, variables);

      const repos = data.search.edges.map((edge) => ({
        name: edge.node.name,
        url: edge.node.url,
        stars: edge.node.stargazerCount,
        forks: edge.node.forkCount,
        openIssues: edge.node.issues.totalCount,
        lastCommitDate: new Date(
          edge.node.defaultBranchRef.target.committedDate,
        ),
        creationDate: new Date(edge.node.createdAt),
      }));

      // Create or get the topic
      const topic = await ctx.db.topic.upsert({
        where: { name: input.topic },
        update: {},
        create: { name: input.topic },
      });

      // Add repos to the database in bulk
      await ctx.db.repo.createMany({
        data: repos.map((repo) => ({
          ...repo,
          topicId: topic.id,
        })),
      });

      return {
        message: `Added ${repos.length} repos for topic: ${input.topic}`,
      };
    }),

  getReposForTopic: publicProcedure
    .input(z.object({ topic: z.string().min(1) }))
    .query(async ({ ctx, input }): Promise<Repo[]> => {
      return ctx.db.repo.findMany({
        where: {
          topic: {
            name: input.topic,
          },
        },
        orderBy: {
          lastCommitDate: "desc",
        },
        take: 10,
      });
    }),
});
