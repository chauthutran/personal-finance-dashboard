/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/login',
            destination: '/appPages/login',
          }
        ]
    }
};

export default nextConfig;
