import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [new URL('https://m.media-amazon.com/images/I/**')],
    domains: ["m.media-amazon.com", "rukminim2.flixcart.com"],
  },
};

export default nextConfig;
// https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/a/o/g/-original-imahek9ykgcsjbf2.jpeg?q=70&crop=false
