import { Podcast } from "@/types/podcast.type";
import Image from "next/image";

export default function PodcastTile({
  podcast,
  onClick,
}: {
  podcast: Podcast;
  onClick: (podcastId: string) => void;
}) {
  const getMins = (secs: number) => {
    return Math.floor(secs / 60);
  };

  return (
    <button
      onClick={onClick.bind(null, podcast.id)}
      className="group duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-start gap-4 p-2 border border-border rounded-md group-hover:border-primary duration-300">
        <Image
          src={podcast.thumbnail}
          alt={podcast.title}
          width={80}
          height={80}
          className="rounded-sm"
        />
        <div className="flex flex-col justify-start text-left gap-1">
          <b className="line-clamp-1 font-bold group-hover:text-primary duration-300">
            {podcast.title}
          </b>
          <p className="line-clamp-2 text-xs font-thin group-hover:text-gray-200 duration-300">
            {podcast.publisher}
          </p>
          <small className="text-xs text-muted-foreground group-hover:text-gray-400 flex gap-2 duration-300">
            <span>{podcast.total_episodes} ep |</span>
            <span>{getMins(podcast.audio_length_sec)} min |</span>
            <span>{podcast.language}</span>
          </small>
        </div>
      </div>
    </button>
  );
}
