"use server";
import fetcher from "./fetcher";

export const getDetailedPodcast = async (id: string) => {
  const res = await fetcher._get(`/podcasts/${id}`);
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
