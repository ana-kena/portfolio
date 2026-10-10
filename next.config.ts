import type { NextConfig } from "next";

// Static export: the whole site becomes plain HTML/CSS files that any host
// (Vercel, Netlify, GitHub Pages) can serve from a CDN edge close to the visitor.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
