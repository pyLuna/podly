"use client";
import { getDetailedPodcast } from "@/service/detailed.podcast.service";
import { DetailedPodcast } from "@/types/podcast.type";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PodcastContextType = {
  podcast?: DetailedPodcast | null;
  setPodcastId?: Dispatch<SetStateAction<string | null>>;
};

const PodcastContext = createContext<PodcastContextType | null>(null);

export default function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastId, setPodcastId] = useState<string | null>(null);
  const detailedPodcast = useQuery<DetailedPodcast>({
    queryKey: ["detailedPodcast", podcastId],
    queryFn: getDetailedPodcast.bind(null, podcastId!),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: podcastId !== null,
  });

  return (
    <PodcastContext.Provider
      value={{ podcast: detailedPodcast.data, setPodcastId }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

export const useDetailedPodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("useDetailedPodcast must be used within a PodcastProvider");
  }
  return context;
};
