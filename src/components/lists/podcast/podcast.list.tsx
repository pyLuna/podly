"use client";
import PodcastTile from "@/components/tiles/Podcast";
import { useBestPodcast } from "@/provider/BestPodcastProvider";
import { useGenres } from "@/provider/GenreProvider";
import { useDetailedPodcast } from "@/provider/PodcastProvider";
import { Podcast } from "@/types/podcast.type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PodcastListSkeleton from "./podcast.skeleton";

export default function PodcastList() {
  const { setPodcastId: setDetailedPodcastId } = useDetailedPodcast();
  const { selectedGenre: id } = useGenres();
  const { ref, inView } = useInView({
    rootMargin: "1000px",
  });

  const {
    podcasts: best_podcast,
    setPodcastId,
    isLoading,
    fetchNextPage,
    refetch,
    isInLimit,
    isFetchingNextPage,
  } = useBestPodcast();

  useEffect(() => {
    if (!isFetchingNextPage && isInLimit && inView) {
      console.log("Loading more podcasts...");
      fetchNextPage?.();
    }
  }, [inView]);

  useEffect(() => {
    setPodcastId(id);
    refetch?.();
  }, [id]);

  return (
    <div className="noscrollbar flex flex-col overflow-y-auto h-[calc(100vh-130px)] gap-4">
      {isLoading && <PodcastListSkeleton length={5} />}

      {best_podcast &&
        best_podcast?.map((podcast: Podcast, i: number) => (
          <PodcastTile
            key={`podcast-${podcast.id}-${i}`}
            podcast={podcast}
            onClick={(v) => setDetailedPodcastId?.(v)}
          />
        ))}
      {isInLimit ? (
        <div
          ref={ref}
          className="space-y-4"
        >
          <PodcastListSkeleton length={1} />
        </div>
      ) : (
        <small className="w-full text-center text-gray-500">
          You&apos;ve reached the bottom
        </small>
      )}
    </div>
  );
}
