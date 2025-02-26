import { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Ensure this matches your Express server port
        pathname: "/uploads/**", // Matches Express static folder path
      },
    ],
  },
};

export default nextConfig;
