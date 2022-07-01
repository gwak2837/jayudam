export const MOBILE_MIN_WIDTH = '280px'
export const TABLET_MIN_WIDTH = '560px'
export const DESKTOP_MIN_WIDTH = '1024px'
export const NAVIGATION_HEIGHT = '5rem'

export const APPLICATION_NAME = '자유담 - 의료기록 가명 인증' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = '자유담' // = site.webmanifest short_name
export const SUBJECT = '공공보건 증진을 위한 의료기록 가명 인증 서비스'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},jayudam,공공보건,의료기록,가명인증` // 최대 10개
export const AUTHOR = '로빈리뷰(LobinReview)'
export const CANONICAL_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://jayudam.vercel.app'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
