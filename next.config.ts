/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/infinai' : '',
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;