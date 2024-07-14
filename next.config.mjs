/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["uploadthing.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.artic.edu",
        port: "",
        pathname: "/iiif/2/**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: false,
}

export default nextConfig
