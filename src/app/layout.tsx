import LeftSideBar from "@/components/LeftSideBar";
import MainBody from "@/components/MainBody";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Podly",
  description: "Listening to podcasts made simple.",
};

export default function RootLayout({
  list,
  player,
}: Readonly<{
  list: React.ReactNode;
  player: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-cols-[100px_400px_1fr] m-4 max-h-[100vh]`}
      >
        <LeftSideBar />
        <MainBody
          list={list}
          player={player}
        />
      </body>
    </html>
  );
}
