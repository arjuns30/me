/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // 👈 enables static export mode
    images: {
      unoptimized: true // 👈 optional but useful for GitHub Pages
    },
    basePath: "/https://github.com/arjuns30/me.git", // 👈 IMPORTANT: match your GitHub repo name
    assetPrefix: "/https://github.com/arjuns30/me.git",
  };
  
  export default nextConfig;