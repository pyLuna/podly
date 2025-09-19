"use client";

import { useDetailedPodcast } from "@/provider/PodcastProvider";
import CustomAudioPlayer from "./CustomAudioPlayer";

export default function Player() {
  const { episodeToPlay, podcast } = useDetailedPodcast();

  return (
    <div className="w-full">
      <CustomAudioPlayer
        src={episodeToPlay?.audio}
        title={episodeToPlay?.title}
        artist={podcast?.publisher}
      />
    </div>
  );
}
