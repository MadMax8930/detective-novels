/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   publicRuntimeConfig: {
      AUTHORIZED_ADMIN_ID: process.env.AUTHORIZED_ADMIN_ID,
   },
}

module.exports = nextConfig
