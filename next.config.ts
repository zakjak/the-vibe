import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c02.purpledshub.com'
      }
    ]
  }
};

export default nextConfig;
