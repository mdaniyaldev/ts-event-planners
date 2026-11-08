import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  // The default image optimizer needs a server, which a static export doesn't have.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
