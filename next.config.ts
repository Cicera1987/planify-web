import type { NextConfig } from "next";
import withPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/planify-api-deploy-render\.onrender\.com\/.*$/,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
    },
  },
  {
    urlPattern:
      /^https:\/\/planify-web-prod\.onrender\.com\/.*\.(js|css|png|jpg|jpeg|svg)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "static-cache",
      expiration: { maxEntries: 50, maxAgeSeconds: 604800 },
    },
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "img.cdndsgni.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pinimg.com", pathname: "/**" },
      { protocol: "https", hostname: "br.freepik.com", pathname: "/**" },
      { protocol: "https", hostname: "img.freepik.com", pathname: "/**" },
      { protocol: "https", hostname: "marketplace.canva.com", pathname: "/**" },
      { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "static.vecteezy.com", pathname: "/**" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com", pathname: "/**" },
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable:
      process.env.NEXT_RUNTIME === "edge" ||
      process.env.NODE_ENV === "development",
    runtimeCaching,
    sw: "sw.js",
  },
};

export default withPWA(nextConfig);