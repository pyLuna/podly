"use client";
import PodcastTile from "@/components/tiles/Podcast";
import { useBestPodcast } from "@/provider/BestPodcastProvider";
import { Podcast } from "@/types/podcast.type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PodcastListSkeleton from "./podcast.skeleton";

export default function PodcastList({ id }: { id: number }) {
  const { ref, inView } = useInView({
    rootMargin: "1000px",
  });

  const {
    podcasts: best_podcast,
    setPodcastId,
    isLoading,
    fetchNextPage,
    refetch,
    page,
  } = useBestPodcast();

  useEffect(() => {
    if (inView) {
      console.log("In view - page:", page);
      fetchNextPage?.();
    }
  }, [inView]);

  useEffect(() => {
    setPodcastId(id);
    refetch?.();
  }, [id]);

  return (
    <>
      {isLoading && <PodcastListSkeleton />}

      {best_podcast &&
        best_podcast?.map((podcast: Podcast, i: number) => (
          <PodcastTile
            key={`podcast-${podcast.id}-${i}`}
            podcast={podcast}
          />
        ))}
      <div ref={ref}></div>
    </>
  );
}
