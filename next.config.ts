/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't need output: 'export' for Vercel
  // basePath should only be used for GitHub Pages, not Vercel
  basePath: process.env.GITHUB_PAGES === 'true' ? '/infinai' : '',
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
    unoptimized: process.env.GITHUB_PAGES === 'true', // Only unoptimize for GitHub Pages
  },
};

module.exports = nextConfig;