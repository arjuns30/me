/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // 👈 enables static export mode
    images: {
      unoptimized: true // 👈 optional but useful for GitHub Pages
    },
    basePath: "/me", // 👈 IMPORTANT: match your GitHub repo name
    assetPrefix: "/me",
  };
  
  export default nextConfig;