"use server";

import { Genre } from "@/types/genre.type";
import fetcher from "./fetcher";

export const getGenres = async () => {
  const res = await fetcher._get("/genres", { top_level_only: "1" });
  if (!res.ok) {
    console.error("Failed to fetch genres:", res.statusText, res.status);
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data.genres as Genre[];
};
