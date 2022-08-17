import Image from 'next/future/image'
import Link from 'next/link'
import PageHead from 'src/components/PageHead'
import Navigation from 'src/layouts/Navigation'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

export default function HomePage() {
  return (
    <PageHead>
      <Navigation>
        <MaxWidth>
          <Image src="/images/logo.webp" alt="jayudam logo" width="280" height="68" />

          <h1>보건기록 인증은 이제 자유담에서</h1>
          <h5>
            더 이상 종이 증명서를 가지고 다니지 마세요.
            <br />
            자유담과 함께 상대방의 보건 기록 증명서를 QR Code 스캔으로 인증하세요.
          </h5>

          <h2>개인간 보건기록 인증 서비스</h2>

          <h3>나의 정보 공개 범위를 선택할 수 있는</h3>
          <h3>가명 인증</h3>

          <div>
            <Link href="/login">로그인</Link>
          </div>
          <div>
            <Link href="/submit">증명서 제출</Link>
          </div>

          <Footer>
            <h3>Copyright © {new Date().getUTCFullYear()} LobinReview</h3>
            <h4>All rights reserved.</h4>

            <FlexWrap>
              <a href="https://jayudam.notion.site" target="_blank" rel="noreferrer">
                <h5>자주 묻는 질문</h5>
              </a>
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
              <a href="https://jayudam.notion.site" target="_blank" rel="noreferrer">
                <h5>자유담 운영원칙</h5>
              </a>
            </FlexWrap>

            <GreySmallText>
              로빈리뷰(LobinReview) | 대표: 곽태욱 | 사업자등록번호:{' '}
              <a
                href="https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/ab/a/a/UTEABAAA13.xml"
                target="_blank"
                rel="noreferrer"
              >
                373-03-02023
              </a>
              <br />
              <a href="http://naver.me/GVMFMiF6" target="_blank" rel="noreferrer">
                06982 서울특별시 동작구 현충로12길 20
              </a>{' '}
              | 이메일: <a href="mailto:jayudam2022@gmail.com">jayudam2022@gmail.com</a> | 고객센터:{' '}
              <a href="tel:010-0000-0000">010-0000-0000</a>
            </GreySmallText>
          </Footer>
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 0rem 1rem;
`

const GreySmallText = styled.p`
  color: #888;
  font-size: 0.6rem;
  line-height: 1rem;
`

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
  min-height: inherit;
`

const Footer = styled.footer`
  display: grid;
  gap: 1rem;

  background: ${(p) => p.theme.shadow};
  padding: 1rem;
`
