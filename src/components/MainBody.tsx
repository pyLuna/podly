"use client";
import BestPodcastProvider from "@/provider/BestPodcastProvider";
import GenreProvider from "@/provider/GenreProvider";
import PodcastProvider from "@/provider/PodcastProvider";
import SearchProvider from "@/provider/SearchProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import LeftSideBar from "./LeftSideBar";
import PodcastList from "./lists/podcast/podcast.list";
import SearchBar from "./SearchBar";

const query = new QueryClient();

export default function MainBody({ children }: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={query}>
      <GenreProvider>
        <PodcastProvider>
          <BestPodcastProvider>
            <SearchProvider>
              <div className="flex min-h-screen">
                <LeftSideBar />
                <section className="flex flex-col max-w-[300px] gap-4 mt-6 mr-4">
                  <SearchBar />
                  <h1 className="text-2xl">Podcasts</h1>
                  <PodcastList />
                </section>
                <main className="flex-1 overflow-y-auto min-h-full my-6 mr-4">
                  {children}
                </main>
              </div>
            </SearchProvider>
          </BestPodcastProvider>
        </PodcastProvider>
      </GenreProvider>
    </QueryClientProvider>
  );
}
