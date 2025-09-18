import SearchBar from "@/components/SearchBar";
import SearchProvider from "../../provider/SearchProvider";

export default function PodcastLists({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <div className="content flex flex-col text-background gap-4 h-[calc(100vh-32px)]">
        <SearchBar />
        {children}
      </div>
    </SearchProvider>
  );
}
