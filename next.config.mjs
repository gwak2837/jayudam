import withPWA from 'next-pwa'

const NODE_ENV = process.env.NODE_ENV

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
    runtime: 'experimental-edge',
    scrollRestoration: true,
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
}

export default withPWA({
  dest: 'public',
  disable: NODE_ENV === 'development',
})(nextConfig)
