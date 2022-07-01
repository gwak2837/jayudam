/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const NODE_ENV = process.env.NODE_ENV

module.exports = withPWA({
  compiler: {
    styledComponents: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
    outputStandalone: true,
    runtime: 'experimental-edge',
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['storage.googleapis.com', 'k.kakaocdn.net'],
  },
  poweredByHeader: NODE_ENV === 'development',
  pwa: {
    dest: 'public',
    disable: NODE_ENV === 'development',
  },
  reactStrictMode: NODE_ENV === 'development',
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
