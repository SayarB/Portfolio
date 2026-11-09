import type { NextConfig } from "next";
import { resumeFileName } from "./lib/site";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Saving the PDF from the browser viewer uses this name too.
  async headers() {
    return [
      {
        source: "/resume.pdf",
        headers: [{ key: "Content-Disposition", value: `inline; filename="${resumeFileName}"` }],
      },
    ];
  },
  // Old pages that no longer exist go to the closest new page.
  async redirects() {
    return [{ source: "/certificates", destination: "/", permanent: true }];
  },
};

export default nextConfig;
