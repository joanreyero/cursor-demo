"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function InputTopic() {
  const [topic, setTopic] = useState("");
  const router = useRouter();
  const createRepos = api.repo.createReposForTopic.useMutation({
    onSuccess: () => {
      router.push(`/${topic}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic) {
      createRepos.mutate({ topic });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
        className="w-64"
      />
      <Button type="submit" disabled={createRepos.isPending}>
        {createRepos.isPending ? "Creating..." : "Create Repos"}
      </Button>
    </form>
  );
}
