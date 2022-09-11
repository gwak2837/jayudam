import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import CommunityIcon from '../svgs/CommunityIcon'
import MyIcon from '../svgs/MyIcon'
import PaperPlaneIcon from '../svgs/PaperPlaneIcon'
import QRCodeIcon from '../svgs/QRCodeIcon'
import VerifyIcon from '../svgs/VerifyIcon'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from '../utils/constants'
import { currentUser } from '../utils/recoil'

type Props = {
  children: ReactNode
}

export default function Navigation({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Color
  const { asPath } = useRouter()

  const isVerifySelected = asPath.startsWith('/verify')
  const isQRCodeSelected = asPath.startsWith('/qrcode')
  const isHomeSelected = asPath === '/'
  const isPostSelected = asPath.startsWith('/post')
  const isMySelected = asPath === `/@${name}`

  return (
    <Flex>
      <MinHeight>{children}</MinHeight>
      <StickyNav>
        <BlockLink href="/verify">
          <VerifyIcon selected={isVerifySelected} />
          <PrimaryText selected={isVerifySelected}>인증</PrimaryText>
        </BlockLink>
        <BlockLink href="/qrcode">
          <QRCodeIcon selected={isQRCodeSelected} />
          <PrimaryText selected={isQRCodeSelected}>QR코드</PrimaryText>
        </BlockLink>
        <BlockLink href="/">
          <PaperPlaneIcon selected={isHomeSelected} />
          <PrimaryText selected={isHomeSelected}>홈</PrimaryText>
        </BlockLink>
        <BlockLink href="/post">
          <CommunityIcon selected={isPostSelected} />
          <PrimaryText selected={isPostSelected}>이야기</PrimaryText>
        </BlockLink>
        <BlockLink href={`/@${name}`}>
          <MyIcon selected={isMySelected} />
          <PrimaryText selected={isMySelected}>내 자유담</PrimaryText>
        </BlockLink>
      </StickyNav>
    </Flex>
  )
}

const Flex = styled.div`
  display: flex;
  flex-flow: column;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    flex-flow: row-reverse nowrap;
    justify-content: center;
    gap: 1rem;
  }

  min-height: 100vh;

  @media (hover: none) and (pointer: coarse) {
    min-height: fill-available;
  }
`

const MinHeight = styled.div`
  flex: 1 1 auto;
  display: grid;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
    min-height: 100vh;
    flex: 0;
  }
`

const StickyNav = styled.nav`
  position: sticky;
  bottom: 0;
  z-index: 10;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  flex: 0 1 auto;

  background: #fff;
  border-top: 1px solid #26ade3;
  font-size: 0.9rem;
  padding: 0 0 env(safe-area-inset-bottom);

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
  display: flex;
  flex-flow: column;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;

  white-space: nowrap;

  padding: 1rem 0.5rem;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    flex-flow: row;
    justify-content: start;
  }

  :hover {
    background: ${(p) => p.theme.shadow};
  }
`

const PrimaryText = styled.span<{ selected?: boolean }>`
  color: ${(p) => (p.selected ? p.theme.primaryText : p.theme.primaryTextAchromatic)};
`
