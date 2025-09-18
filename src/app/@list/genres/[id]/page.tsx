"use client";

import PodcastList from "@/components/lists/podcast/podcast.list";
import { useParams } from "next/navigation";

export default function PodcastByGenreIdPage() {
  const { id } = useParams();
  return (
    <section>
      <h1>{id}</h1>
      <article>
        <PodcastList id={id as unknown as number} />
      </article>
    </section>
  );
}
