"use client";

import PodcastList from "@/components/lists/podcast/podcast.list";
import { useParams } from "next/navigation";

export default function PodcastByGenreIdPage() {
  const { name, id } = useParams();
  const decodedName = decodeURIComponent(name as string).replace(
    /%26|&amp;/g,
    "&"
  );
  return (
    <section>
      <h1>{decodedName}</h1>
      <article>
        <PodcastList id={id as unknown as number} />
      </article>
    </section>
  );
}
