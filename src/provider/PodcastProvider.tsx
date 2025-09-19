"use client";
import { getDetailedPodcast } from "@/service/detailed.podcast.service";
import { DetailedPodcast, Episode } from "@/types/podcast.type";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PodcastContextType = {
  podcast?: DetailedPodcast | null;
  episodeToPlay: Episode | null;
  setEpisodeToPlay: Dispatch<SetStateAction<Episode | null>>;
  setPodcastId?: Dispatch<SetStateAction<string | null>>;
};

const PodcastContext = createContext<PodcastContextType | null>(null);

export default function PodcastProvider({ children }: { children: ReactNode }) {
  const [podcastId, setPodcastId] = useState<string | null>(null);
  const [episodeToPlay, setEpisodeToPlay] = useState<Episode | null>(null);

  const detailedPodcast = useQuery<DetailedPodcast>({
    queryKey: ["detailedPodcast", podcastId],
    queryFn: getDetailedPodcast.bind(null, podcastId!),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: podcastId !== null,
  });

  useEffect(() => {
    if (detailedPodcast.data && !episodeToPlay) {
      const firstEpisode = detailedPodcast.data.episodes[0];
      setEpisodeToPlay(firstEpisode);
    }
  }, [detailedPodcast.data, episodeToPlay]);

  return (
    <PodcastContext.Provider
      value={{
        podcast: detailedPodcast.data,
        episodeToPlay,
        setEpisodeToPlay,
        setPodcastId,
      }}
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
