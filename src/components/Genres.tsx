"use client";
import { useGenres } from "@/provider/GenreProvider";
import { Genre } from "@/types/genre.type";

export default function Genres() {
  const { genres, setSelectedGenre } = useGenres();
  return (
    <div className="noscrollbar flex gap-2 overflow-x-auto w-full mb-4 px-2">
      {genres?.map((genre: Genre) => (
        <button
          key={genre.id}
          className="border-2 border-secondary/50 bg-primary/10 cursor-pointer text-xs px-3 py-1 rounded-full hover:bg-secondary/10 transition-colors flex flex-shrink-0"
          onClick={() => setSelectedGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
