"use client";
import BestPodcastProvider from "@/provider/BestPodcastProvider";
import PodcastProvider from "@/provider/PodcastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const query = new QueryClient();

export default function MainBody({
  list,
  player,
}: {
  list?: ReactNode;
  player?: ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
      <PodcastProvider>
        <BestPodcastProvider>
          {list}
          {player}
        </BestPodcastProvider>
      </PodcastProvider>
    </QueryClientProvider>
  );
}
