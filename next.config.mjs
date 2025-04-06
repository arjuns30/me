/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/me",          // ✅ MATCHES your GitHub repo name
    assetPrefix: "/me",       // ✅ needed for static files like _next/
    images: {
      unoptimized: true
    }
  };
  
  export default nextConfig;