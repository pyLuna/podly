"use client";
import { useSearch } from "@/provider/SearchProvider";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const search = useSearch();
  const [hasQuery, setHasQuery] = useState(true);

  return (
    <div className="relative h-10 items-center space-x-2 border border-border rounded-md bg-background px-2 text-foreground">
      {hasQuery && (
        <div className="absolute top-1/2 -translate-y-1/2 right-0 text-foreground">
          <SearchIcon size={16} />
        </div>
      )}
      <input
        type="text"
        className="w-full h-full border-none ring-0 outline-none bg-background text-foreground placeholder:foreground"
        value={search.query}
        placeholder="Search podcasts..."
        onChange={(e) => {
          const query = e.target.value;
          setHasQuery(query.length > 35 === false);
          search.setQuery(query);
        }}
      />
    </div>
  );
}
