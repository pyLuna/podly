"use server";
import fetcher from "./fetcher";

export const getPodcastById = async (id: number, page?: number) => {
  const res = await fetcher._get(`/best_podcasts`, {
    genre_id: id,
    page: page ?? 1,
    region: "us",
    sort: "listen_score",
    safe_mode: "0",
  });
  if (!res.ok) {
    console.error(
      "Failed to fetch podcast by ID:",
      res.statusText,
      res.status,
      id
    );
    throw new Error("Network response was not ok");
  }
  return await res.json();
};
