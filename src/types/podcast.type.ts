export interface Podcast {
  id: string;
  title: string;
  image: string;
  language: string;
  publisher: string;
  thumbnail: string;
  description: string;
  audio_length_sec: number;
  listen_score_global_rank: string;
  country: string;
  total_episodes: number;
}

export interface Episode {
  id: string;
  link: string;
  audio: string;
  image: string;
  title: string;
  thumbnail: string;
  description: string;
  audio_length_sec: number;
  explicit_content: boolean;
}

export interface DetailedPodcast extends Omit<Podcast, "audio"> {
  episodes: Episode[];
  next_episode_pub_date: number;
  earliest_pub_date_ms: number;
  latest_pub_date_ms: number;
}
