"use client";
import { getGenres } from "@/service/genres.service";
import { Genre } from "@/types/genre.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Genres() {
  const genres = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: 1,
  });
  return (
    <div className="rounded-md">
      <div className="noscrollbar overflow-x-auto">
        <div className="flex flex-row gap-2">
          {genres?.data?.map((genre: Genre) => (
            <Link
              key={genre.id}
              className=" border border-secondary/50 text-xs px-3 py-1 rounded hover:bg-secondary/10 transition-colors flex flex-shrink-0"
              href={`/genres/${genre.name}/${genre.id}`}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
