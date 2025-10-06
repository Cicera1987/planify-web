import type { NextConfig } from "next";
import withPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/planify-api-deploy-render\.onrender\.com\/.*$/,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 86400,
      },
    },
  },
  {
    urlPattern: /^https:\/\/planify-web-prod\.onrender\.com\/.*\.(js|css|png|jpg|jpeg|svg)$/,
    handler: "CacheFirst",
    options: {
      cacheName: "static-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 604800,
      },
    },
  },
];

const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.cdndsgni.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "br.freepik.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "marketplace.canva.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    runtimeCaching,
  },
});

export default nextConfig;
