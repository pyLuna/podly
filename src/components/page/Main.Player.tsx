"use client";
import { useDetailedPodcast } from "@/provider/PodcastProvider";

export default function MainPlayerPage() {
  const { podcast } = useDetailedPodcast();

  return (
    <div className="flex flex-col items-center p-24">
      <span className="border border-border">Home</span>
      <span className="text-primary">Primary</span>
      <span className="text-secondary">Secondary</span>
      {/* <pre>{JSON.stringify(podcast, null, 2)}</pre> */}
      <p>{podcast?.episodes[0].title}</p>
      <audio
        controls
        autoPlay
        src={podcast?.episodes[2].audio}
      />
    </div>
  );
}
