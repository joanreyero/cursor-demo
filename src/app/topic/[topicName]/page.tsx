import { api, HydrateClient } from "~/trpc/server";
import Link from "next/link";

export default async function TopicPage({
  params,
}: {
  params: { topicName: string };
}) {
  const repos = await api.repo.getReposForTopic({ topic: params.topicName });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-2xl font-bold tracking-tight">
            Repos for topic: {params.topicName}
          </h1>
          <Link href="/" className="mb-4 text-blue-500 hover:underline">
            Back to Home
          </Link>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <li key={repo.id} className="rounded border p-4">
                <h3 className="font-semibold">{repo.name}</h3>
                <p>Stars: {repo.stars}</p>
                <p>Forks: {repo.forks}</p>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on GitHub
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </HydrateClient>
  );
}
