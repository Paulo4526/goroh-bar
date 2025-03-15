import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/goroh/:path*', // Aqui, você está redirecionando todas as requisições que começam com /goroh
        destination: 'http://localhost:5051/goroh/:path*', // Para o backend em localhost:5051
      },

      {
        source: '/gorohbebidas/:path*', // Aqui, você está redirecionando todas as requisições que começam com /goroh
        destination: 'http://localhost:5051/gorohbebidas/:path*', // Para o backend em localhost:5051
      },
    ];
  },
};

export default nextConfig;
