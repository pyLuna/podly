"use client";
import { getGenres } from "@/service/genres.service";
import { Genre } from "@/types/genre.type";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

type GenreContextType = {
  genres: Genre[];
  isLoading: boolean;
  selectedGenre: GenreId;
  setSelectedGenre: (id: GenreId) => void;
};

type GenreId = Genre["id"];

const GenreContext = createContext<GenreContextType>({
  genres: [],
  isLoading: false,
  selectedGenre: 127,
  setSelectedGenre: () => {},
});

export default function GenreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedGenre, setSelectedGenre] = useState<GenreId>(127);
  const genres = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: getGenres,
    retry: 1,
  });
  return (
    <GenreContext.Provider
      value={{
        genres: genres.data || [],
        isLoading: genres.isLoading,
        selectedGenre,
        setSelectedGenre,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}

export const useGenres = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenres must be used within a GenreProvider");
  }
  return context;
};
