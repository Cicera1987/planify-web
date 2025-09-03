import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.cdndsgni.com",
      "i.pinimg.com",
      "br.freepik.com",
      "img.freepik.com",
    ],
  },
};

export default nextConfig;
