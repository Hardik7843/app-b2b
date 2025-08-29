import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckfob8zphd0vlpan.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
