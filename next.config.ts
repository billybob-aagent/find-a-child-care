import type { NextConfig } from "next";

const nextConfig = {
  turbopack: {
    // Silence workspace root warning in monorepo-ish environments
    root: __dirname,
  },
} as unknown as NextConfig;

export default nextConfig;
