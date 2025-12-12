import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    domains: ["m.media-amazon.com","rukminim1.flixcart.com", "rukminim2.flixcart.com"],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
// https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/a/o/g/-original-imahek9ykgcsjbf2.jpeg?q=70&crop=false
