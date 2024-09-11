import { api, HydrateClient } from "~/trpc/server";
import { InputTopic } from "~/components/InputTopic";
import Link from "next/link";

export default async function Home() {
  const topics = await api.topic.getTopics();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-2xl font-bold tracking-tight">
            Cursor GitHub repos
          </h1>
          <InputTopic />
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Popular Topics</h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={`/topic/${topic.name}`}
                    className="text-blue-500 hover:underline"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
