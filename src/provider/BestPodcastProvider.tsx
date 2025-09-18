"use client";
import { getPodcastById } from "@/service/best_podcast.service";
import { Podcast } from "@/types/podcast.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type BestPodcastContextType = {
  podcasts: Podcast[];
  setPodcastId: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
  page: number;
  fetchNextPage?: () => void;
  refetch?: () => void;
};

const BestPodcastContext = createContext<BestPodcastContextType | null>(null);

export default function BestPodcastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [podcastId, setPodcastId] = useState<number>(127);
  const [page, setPage] = useState<number>(0);

  const best_podcast = useInfiniteQuery({
    queryKey: ["best_podcast", podcastId],
    queryFn: (context) => {
      setPage(context.pageParam ?? 0);
      return getPodcastById(podcastId, context.pageParam);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.has_next) {
        return lastPage.next_page_number;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => firstPage.previous_page_number,
    initialPageParam: 0,
    retry: 1,
    enabled: podcastId !== null,
    maxPages: 10,
  });

  return (
    <BestPodcastContext.Provider
      value={{
        podcasts:
          best_podcast.data?.pages.flatMap((page) => page.podcasts) || [],
        fetchNextPage: best_podcast.fetchNextPage,
        setPodcastId,
        page,
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
