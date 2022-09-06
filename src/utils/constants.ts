const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV
const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string

export const NEXT_PUBLIC_BBATON_CLIENT_ID = process.env.NEXT_PUBLIC_BBATON_CLIENT_ID as string

export const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string

export const NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = process.env
  .NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string
export const NEXT_PUBLIC_KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string

export const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string

export const NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY = process.env
  .NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY as string

if (!NEXT_PUBLIC_BACKEND_URL) throw new Error('`NEXT_PUBLIC_BACKEND_URL` 환경 변수를 설정해주세요.')

if (!NEXT_PUBLIC_BBATON_CLIENT_ID)
  throw new Error('`NEXT_PUBLIC_BBATON_CLIENT_ID` 환경 변수를 설정해주세요.')

if (!NEXT_PUBLIC_NAVER_CLIENT_ID)
  throw new Error('`NEXT_PUBLIC_NAVER_CLIENT_ID` 환경 변수를 설정해주세요.')

if (!NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
  throw new Error('`NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 환경 변수를 설정해주세요.')
if (!NEXT_PUBLIC_KAKAO_REST_API_KEY)
  throw new Error('`NEXT_PUBLIC_KAKAO_REST_API_KEY` 환경 변수를 설정해주세요.')

if (!NEXT_PUBLIC_GOOGLE_CLIENT_ID)
  throw new Error('`NEXT_PUBLIC_GOOGLE_CLIENT_ID` 환경 변수를 설정해주세요.')
if (!NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
  throw new Error('`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` 환경 변수를 설정해주세요.')

if (!NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY)
  throw new Error('`NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY` 환경 변수를 설정해주세요.')

export const MOBILE_MIN_WIDTH = '320px'
export const MOBILE_MIN_HEIGHT = '568px'
export const TABLET_MIN_WIDTH_1 = '767px'
export const TABLET_MIN_WIDTH = '768px'
export const TABLET_MAX_WIDTH = '1366px'
export const DESKTOP_MIN_WIDTH = '1440px'
export const HD_DESKTOP_MIN_WIDTH = '1920px'

export const APPLICATION_NAME = '자유담 - 보건기록 가명인증' // = site.webmanifest name
export const APPLICATION_SHORT_NAME = '자유담' // = site.webmanifest short_name
export const SUBJECT = '공공보건 증진을 위한 보건기록 가명인증 서비스'
export const KEYWORDS = `${APPLICATION_SHORT_NAME},jayudam,공공보건,보건기록,가명인증` // 최대 10개
export const AUTHOR = '로빈리뷰(LobinReview)'
export const CANONICAL_URL =
  NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://jayudam.vercel.app'
    : NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'
