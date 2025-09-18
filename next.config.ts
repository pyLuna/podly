import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: "./",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-3.listennotes.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
