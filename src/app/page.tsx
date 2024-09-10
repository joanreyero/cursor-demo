import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-2xl font-bold tracking-tight">
            Cursor GitHub repos
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
