import Link from 'next/link'
import { ReactNode } from 'react'
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

  return (
    <Flex>
      <MinHeight>{children}</MinHeight>
      <StickyNav>
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

const MinHeight = styled.div`
  min-height: 100vh;
`

const StickyNav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 3;

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
    border: 1px solid #26ade3;
    height: 100vh;
    display: block;
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
