import { useDetailedPodcast } from "@/provider/PodcastProvider";

export default function PodcastDetail({ className }: { className?: string }) {
  const { podcast } = useDetailedPodcast();
  return (
    <div className={`${className}`}>
      <h1>Podcast Detail</h1>
      {podcast ? (
        <div>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
        </div>
      ) : (
        <p>No podcast selected.</p>
      )}
    </div>
  );
}
