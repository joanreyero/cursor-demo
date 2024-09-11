import { api, HydrateClient } from "~/trpc/server";
import { ReposChart } from "~/components/reposChart";

export default async function Home({ params }: { params: { topic: string } }) {
  const repos = await api.repo.getReposForTopic({ topic: params.topic });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-2xl font-bold tracking-tight">{params.topic}</h1>
          <ReposChart repos={repos} />
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </HydrateClient>
  );
}
