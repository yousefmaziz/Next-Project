const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
