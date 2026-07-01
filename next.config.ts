import type { NextConfig } from "next";

// Supabase project host — used to allow next/image to optimize remote images
// (project covers, avatars, etc.) served from Supabase Storage.
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : undefined;
  } catch {
    return undefined;
  }
})();

// Content-Security-Policy. 'unsafe-inline' is required for Next.js's inline
// bootstrap and framer-motion's inline styles; script stays same-origin plus
// Google Analytics. React's dev server needs 'unsafe-eval' (used only in dev,
// never in production builds), so it is added conditionally. Tighten further
// (nonces) if you drop those dependencies.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : "",
  "https://www.googletagmanager.com https://www.google-analytics.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analyticsdata.googleapis.com https://region1.google-analytics.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Force HTTPS only in production. In dev the server is http (and reachable
  // over LAN at http://192.168.x.x:3000 for phone testing), so upgrading
  // insecure requests would break loading entirely on mobile.
  isDev ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // HSTS is only meaningful (and only honored) over HTTPS — production only.
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework version.
  poweredByHeader: false,
  compress: true,

  // Allow accessing the dev server from other devices on the local network
  // (e.g. testing on a phone at http://192.168.x.x:3000).
  allowedDevOrigins: ["192.168.0.113", "192.168.0.*", "192.168.1.*"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost }]
      : [],
  },

  experimental: {
    optimizeCss: true,
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
