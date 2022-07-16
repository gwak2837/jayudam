import Image from 'next/future/image'
import Link from 'next/link'
import PageHead from 'src/components/PageHead'
import Navigation from 'src/layouts/Navigation'
import styled from 'styled-components'

export default function HomePage() {
  return (
    <PageHead>
      <Navigation>
        <Link href="/login">로그인</Link>

        <Footer>
          <div>
            <Image src="/images/logo.webp" alt="jayudam logo" width="280" height="68" />
            <GreyH5>인증 기반 커뮤니티</GreyH5>
          </div>

          <h3>Copyright © {new Date().getUTCFullYear()} RobinReview. All rights reserved.</h3>

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
              <h5>서비스 이용 지침</h5>
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
            | 이메일: <a href="mailto:gwak2837@kakao.com">gwak2837@kakao.com</a> | 고객센터:{' '}
            <a href="tel:010-0000-0000">010-0000-0000</a>
          </GreySmallText>
        </Footer>
      </Navigation>
    </PageHead>
  )
}

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
