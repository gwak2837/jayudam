import Script from 'next/script'
import { NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY } from 'src/utils/constants'

function KakaoScript() {
  return (
    <Script
      onLoad={() => window.Kakao.init(NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)}
      src="https://developers.kakao.com/sdk/js/kakao.min.js"
    />
  )
}

export default KakaoScript
