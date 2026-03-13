import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["gsap", "@gsap/react", "motion", "three"],
  },
}

export default nextConfig
