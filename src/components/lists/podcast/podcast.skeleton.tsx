import PodcastTileSkeleton from "./podcast.tile.skeleton";

export default function PodcastListSkeleton({
  length = 10,
}: {
  length: number;
}) {
  const skeleton = Array.from({ length }).map((_, index) => (
    <PodcastTileSkeleton key={index} />
  ));
  return <>{skeleton}</>;
}
