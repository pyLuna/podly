"use server";
import fetcher from "./fetcher";

export const getCuratedPodcasts = async (page?: number) => {
  const options: Record<string, unknown> = page ? { page: page } : {};
  const res = await fetcher._get("/curated_podcasts", options);

  if (!res.ok) {
    console.error("Failed to fetch curated podcasts", res.statusText);
    throw new Error("Failed to fetch curated podcasts");
  }
  return await res.json();
};
