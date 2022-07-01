import { BrowserCodeReader, BrowserQRCodeReader } from '@zxing/browser'
import { Result } from '@zxing/library'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import { Slider } from 'src/styles'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
  padding: 0.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg {
    width: 15rem;
    height: 100%;
    padding: 0.5rem;
  }
`

const SliderWithoutScollBar = styled(Slider)`
  scrollbar-color: transparent transparent;
  scrollbar-width: 0px;

  ::-webkit-scrollbar {
    height: 0;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border: none;
  }

  :hover > li > *,
  :focus-within > li > * {
    animation-name: none;
  }

  @keyframes toNext {
    75% {
      left: 0;
    }
    95% {
      left: 100%;
    }
    98% {
      left: 100%;
    }
    99% {
      left: 0;
    }
  }

  @keyframes toStart {
    75% {
      left: 0;
    }
    95% {
      left: -300%;
    }
    98% {
      left: -300%;
    }
    99% {
      left: 0;
    }
  }

  @keyframes snap {
    96% {
      scroll-snap-align: center;
    }
    97% {
      scroll-snap-align: none;
    }
    99% {
      scroll-snap-align: none;
    }
    100% {
      scroll-snap-align: center;
    }
  }
`

const WhiteButton = styled.button`
  border: 1px solid #eee;
  border-radius: 5px;

  padding: 0.7rem;
`

const Snap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;

  animation-timing-function: ease;
  animation-duration: 4s;
  animation-iteration-count: infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-name: none;
  }
`

const SnapNext = styled(Snap)`
  animation-name: toNext, snap;
`

const SnapStart = styled(Snap)`
  animation-name: toStart, snap;
`

const Frame16to10 = styled.li<{ background?: string }>`
  aspect-ratio: 16 / 10;
  background: ${(p) => p.background ?? '#fff'};
  flex: 0 0 100%;
  position: relative;
`

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 0rem 1rem;

  /* font-size: 0.6rem; */
`

const GreySmallText = styled.p`
  color: #888;
  font-size: 0.6rem;
  line-height: 1rem;
`

const GreyH5 = styled.h5`
  color: #888;
`

const Footer = styled.footer`
  display: grid;
  gap: 1rem;

  padding: 1rem;
`

export default function HomePage() {
  const qrCodeReaderRef = useRef<HTMLVideoElement>(null)
  const codeReaderRef = useRef<BrowserQRCodeReader>()

  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>()
  const [selectedDeviceId, setSelectedDeviceId] = useState('')
  const [result, setResult] = useState<Result>()

  useEffect(() => {
    codeReaderRef.current = new BrowserQRCodeReader()
    BrowserCodeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        setVideoInputDevices(videoInputDevices)
        setSelectedDeviceId(videoInputDevices[0].deviceId)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (qrCodeReaderRef.current && codeReaderRef.current && videoInputDevices && selectedDeviceId) {
      codeReaderRef.current
        .decodeOnceFromVideoDevice(selectedDeviceId, qrCodeReaderRef.current)
        .then((result) => setResult(result))
        .catch((error) => console.error(error))
    }
  }, [selectedDeviceId, videoInputDevices])

  return (
    <PageHead>
      <video ref={qrCodeReaderRef} />
      <div>홈</div>
      <br />

      <pre>{JSON.stringify(result, null, 2)}</pre>

      <Footer>
        <div>
          <Image src="/images/logo.webp" alt="jayudam logo" width="280" height="68" />
          <GreyH5>인증 기반 커뮤니티</GreyH5>
        </div>

        <h3>Copyright © {new Date().getUTCFullYear()} RobinReview. All rights reserved.</h3>

        <FlexWrap>
          <Link href="/faq">
            <h5>자주 묻는 질문</h5>
          </Link>
          <a
            href="https://jayudam.notion.site/2022-07-01-a668b74717fa4b39b022610cde11911d"
            target="_blank"
            rel="noreferrer"
          >
            <h5>이용약관</h5>
          </a>
          <a
            href="https://jayudam.notion.site/2022-06-29-a393f91912884de2b9c54ce8b9ab2208"
            target="_blank"
            rel="noreferrer"
          >
            <h5>개인정보처리방침</h5>
          </a>
          <Link href="/code-of-conduct">
            <h5>서비스 이용 지침</h5>
          </Link>
        </FlexWrap>

        <GreySmallText>
          로빈리뷰(RobinReview) | 대표: 곽태욱 | 사업자등록번호:{' '}
          <a
            href="https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml"
            target="_blank"
            rel="noreferrer"
          >
            373-03-02023
          </a>
          <br />
          06982 서울특별시 동작구 현충로12길 20 | 이메일:{' '}
          <a href="mailto:gwak2837@kakao.com">gwak2837@kakao.com</a> | 고객센터:{' '}
          <a href="tel:010-0000-0000">010-0000-0000</a>
        </GreySmallText>
      </Footer>
    </PageHead>
  )
}
