"use client";
import PodcastList from "../lists/podcast/podcast.list";

export default function MainPageComponent() {
  return (
    <section>
      <h1>Podcasts</h1>
      <article>
        <PodcastList id={127} />
      </article>
    </section>
  );
}
