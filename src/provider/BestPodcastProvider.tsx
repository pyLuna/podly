"use client";
import { getPodcastById } from "@/service/best_podcast.service";
import { Podcast } from "@/types/podcast.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type BestPodcastContextType = {
  podcasts: Podcast[];
  setPodcastId: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
  isInLimit: boolean;
  isFetchingNextPage: boolean;
};

const BestPodcastContext = createContext<BestPodcastContextType | null>(null);

export default function BestPodcastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [podcastId, setPodcastId] = useState<number>(127);
  const pageRef = useRef<number>(1);

  const best_podcast = useInfiniteQuery({
    queryKey: ["best_podcast", podcastId],
    queryFn: async (context) => {
      const result = await getPodcastById(podcastId, context.pageParam);
      // pageRef.current = context.pageParam;
      pageRef.current += 1;
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.has_next) {
        return lastPage.next_page_number;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => firstPage.previous_page_number,
    refetchOnReconnect: true,
    initialPageParam: 1,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: podcastId !== null,
  });

  useEffect(() => {
    pageRef.current = 1;
  }, [podcastId]);

  return (
    <BestPodcastContext.Provider
      value={{
        podcasts:
          best_podcast.data?.pages.flatMap((page) => page.podcasts) || [],
        fetchNextPage: best_podcast.fetchNextPage,
        isLoading: best_podcast.isLoading,
        isError: best_podcast.isError,
        refetch: best_podcast.refetch,
        isInLimit: pageRef.current <= 5,
        isFetchingNextPage: best_podcast.isFetchingNextPage,
        setPodcastId,
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
