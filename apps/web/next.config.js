/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'https://tes-gefima-web.vercel.app/',
          },
        ],
      },
}

module.exports = nextConfig
