import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/-ornek-sevgili-sitemiz" : "",
  assetPrefix: isProd ? "/-ornek-sevgili-sitemiz/" : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
