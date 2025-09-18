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
