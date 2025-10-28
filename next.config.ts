import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'kappa.lol',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains for user-provided images
      },
    ],
  },
};

export default nextConfig;
