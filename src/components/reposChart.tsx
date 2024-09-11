"use client";
import { type Repo } from "@prisma/client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReposChartProps {
  repos: Repo[];
}

export function ReposChart({ repos }: ReposChartProps) {
  const chartData = repos.map((repo) => ({
    name: repo.name,
    Stars: repo.stars,
    Forks: repo.forks,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Stars" fill="#8884d8" />
        <Bar dataKey="Forks" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
