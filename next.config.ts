import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old pages that no longer exist go to the closest new page.
  async redirects() {
    return [{ source: "/certificates", destination: "/", permanent: true }];
  },
};

export default nextConfig;
