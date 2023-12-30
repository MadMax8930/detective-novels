/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   publicRuntimeConfig: {
      AUTHORIZED_ADMIN_ID: process.env.AUTHORIZED_ADMIN_ID,
      AUTHORIZED_DEV_ADMIN_ID: process.env.AUTHORIZED_DEV_ADMIN_ID,
   },
   images: {
      domains: []
   },
}

module.exports = nextConfig