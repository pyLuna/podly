export default function PodcastTileSkeleton() {
  return (
    <div className="flex gap-2 animate-pulse bg-gray-800 rounded-md w-[300px] p-2">
      <div className="size-[80px] bg-gray-700 rounded-sm "></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-gray-700 rounded-md h-4 w-full"></div>
        <div className="bg-gray-700 rounded-md h-4 w-1/2"></div>
        <div className="bg-gray-700 rounded-md h-4 w-1/3"></div>
      </div>
    </div>
  );
}
