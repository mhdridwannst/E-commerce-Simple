/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Thumbnail produk dummyjson di-host di domain ini
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
};

export default nextConfig;
