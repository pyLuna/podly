"use client";
import CustomAudioPlayer from "@/components/CustomAudioPlayer";
import Genres from "@/components/Genres";
import PodcastDetail from "@/components/PodcastDetail";
import { useDetailedPodcast } from "@/provider/PodcastProvider";

export default function MainPage() {
  const { episodeToPlay, podcast } = useDetailedPodcast();
  return (
    <section className="flex flex-col w-full h-full">
      <Genres />
      <PodcastDetail className="flex-1" />
      <CustomAudioPlayer
        src={episodeToPlay?.audio}
        title={episodeToPlay?.title}
        artist={podcast?.publisher}
      />
    </section>
  );
}
