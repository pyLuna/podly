"use client";
import { getPodcastById } from "@/service/best_podcast.service";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type BestPodcastContextType = {
  podcasts: any;
  setPodcastId: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
  refetch?: () => void;
};

const BestPodcastContext = createContext<BestPodcastContextType | null>(null);

export default function BestPodcastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [podcastId, setPodcastId] = useState<number>(127);
  const best_podcast = useQuery({
    queryKey: ["best_podcast", podcastId],
    queryFn: () => getPodcastById(podcastId),
    retry: 1,
    enabled: podcastId !== null,
  });

  return (
    <BestPodcastContext.Provider
      value={{
        podcasts: best_podcast.data?.podcasts,
        setPodcastId,
        isLoading: best_podcast.isLoading,
        isError: best_podcast.isError,
        refetch: best_podcast.refetch,
      }}
    >
      {children}
    </BestPodcastContext.Provider>
  );
}

export function useBestPodcast() {
  const context = useContext(BestPodcastContext);

  if (!context) {
    throw new Error("useBestPodcast must be used within a BestPodcastProvider");
  }
  return context;
}
