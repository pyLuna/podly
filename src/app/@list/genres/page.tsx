"use client";
import GenreSkeleton from "@/components/lists/genres/genre.skeleton";
import { getGenres } from "@/service/genres.service";
import { Genre } from "@/types/genre.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function GenresPage() {
  const genres = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: 1,
  });

  if (genres.isLoading) {
    return <GenreSkeleton />;
  }

  return (
    <section className="flex flex-col gap-4">
      <h1>Genres</h1>
      <div className="rounded-md">
        {genres.data ? (
          <ul>
            {genres.data?.map((genre: Genre) => (
              <li key={genre.id}>
                <Link
                  className="hover:underline hover:text-primary duration-300"
                  href={`/genres/${genre.id}`}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
