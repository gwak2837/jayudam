/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa'

const NODE_ENV = process.env.NODE_ENV

export default withPWA({
  compiler: {
    styledComponents: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
    runtime: 'experimental-edge',
  },
  i18n: {
    locales: ['ko-KR', 'en'],
    defaultLocale: 'ko-KR',
  },
  images: {
    domains: ['storage.googleapis.com', 'k.kakaocdn.net'],
  },
  output: 'standalone',
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