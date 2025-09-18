import PodcastTileSkeleton from "./podcast.tile.skeleton";

export default function PodcastListSkeleton() {
  const skeleton = Array.from({ length: 10 }).map((_, index) => (
    <PodcastTileSkeleton key={index} />
  ));
  return <>{skeleton}</>;
}
