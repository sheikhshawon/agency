import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from other devices on the local network
  // (e.g. testing on a phone at http://192.168.x.x:3000). Without this, Next.js
  // blocks cross-origin dev resources, so the JS bundle never loads on the device
  // and the page renders blank.
  allowedDevOrigins: ["192.168.0.113", "192.168.0.*", "192.168.1.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
