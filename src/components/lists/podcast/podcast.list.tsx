"use client";
import PodcastTile from "@/components/tiles/Podcast";
import { useBestPodcast } from "@/provider/BestPodcastProvider";
import { useEffect } from "react";
import PodcastListSkeleton from "./podcast.skeleton";

export default function PodcastList({ id }: { id: number }) {
  const {
    podcasts: best_podcast,
    setPodcastId,
    isLoading,
    refetch,
  } = useBestPodcast();

  useEffect(() => {
    setPodcastId(id);
    console.log("PodcastList - useEffect - id changed:", id);
    refetch && refetch();
  }, [id]);

  return (
    <>
      {isLoading && <PodcastListSkeleton />}

      {best_podcast &&
        best_podcast?.map((podcast: any) => (
          <PodcastTile
            key={podcast.id}
            podcast={podcast}
          />
        ))}
    </>
  );
}
