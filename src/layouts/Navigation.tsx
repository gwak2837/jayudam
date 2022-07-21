import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import VerifyIcon from '../svgs/verify.svg'

type Props = {
  children: ReactNode
}

function Navigation({ children }: Props) {
  const { nickname } = useRecoilValue(currentUser)

  // nav height 계산하기
  const [navHeight, setNavHeight] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      setNavHeight(ref.current.clientHeight)
    }
  }, [])

  return (
    <Flex>
      <MinHeight navHeight={navHeight}>{children}</MinHeight>
      <StickyNav ref={ref}>
        <BlockLink href="/verify">
          <VerifyIcon />
          <span>인증</span>
        </BlockLink>
        <BlockLink href="/qrcode">
          <VerifyIcon />
          <span>QR Code</span>
        </BlockLink>
        <BlockLink href="/">
          <VerifyIcon />
          <span>홈</span>
        </BlockLink>
        <BlockLink href="/post">
          <VerifyIcon />
          <span>이야기</span>
        </BlockLink>
        <BlockLink href={`/@${nickname}`}>
          <VerifyIcon />
          <span>my 자유담</span>
        </BlockLink>
      </StickyNav>
    </Flex>
  )
}

export default Navigation

const Flex = styled.div`
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: center;
    gap: 1rem;
  }
`

const MinHeight = styled.div<{ navHeight: number }>`
  min-height: calc(100vh - ${(p) => p.navHeight + 1}px);
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-height: 100vh;
  }
`

const StickyNav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 10;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;

  background: #fff;
  border-top: 1px solid #26ade3;
  font-size: 0.9rem;

  svg {
    width: 1.5rem;
  }

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    top: 0;

    border: 1px solid #26ade3;
    display: block;
    height: 100vh;
    max-width: 200px;
    padding: 0 0.7rem;
  }
`

const BlockLink = styled(Link)`
  padding: 1rem 0.5rem 1.5rem;
  text-align: center;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    display: block;
    text-align: left;

    :hover {
      background: ${(p) => p.theme.background};
    }
  }
`
