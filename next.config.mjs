/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/E-commerce-Simple",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
};

export default nextConfig;
