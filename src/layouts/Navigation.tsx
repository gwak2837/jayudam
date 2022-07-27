import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CommunityIcon from 'src/svgs/CommunityIcon'
import MyIcon from 'src/svgs/MyIcon'
import PaperPlaneIcon from 'src/svgs/PaperPlaneIcon'
import QRCodeIcon from 'src/svgs/QRCodeIcon'
import VerifyIcon from 'src/svgs/VerifyIcon'
import { TABLET_MIN_WIDTH, TABLET_MIN_WIDTH_1 } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

export default function Navigation({ children }: Props) {
  const { nickname } = useRecoilValue(currentUser)

  // nav height 계산하기
  const [navHeight, setNavHeight] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      setNavHeight(ref.current.clientHeight)
    }
  }, [])

  // Color
  const { asPath } = useRouter()

  const isVerifySelected = asPath.startsWith('/verify')
  const isQRCodeSelected = asPath.startsWith('/qrcode')
  const isHomeSelected = asPath === '/'
  const isPostSelected = asPath.startsWith('/post')
  const isMySelected = asPath.startsWith('/@')

  return (
    <Flex>
      <MinHeight navHeight={navHeight}>{children}</MinHeight>
      <StickyNav ref={ref}>
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
        <BlockLink href={`/@${nickname}`}>
          <MyIcon selected={isMySelected} />
          <PrimaryText selected={isMySelected}>내 자유담</PrimaryText>
        </BlockLink>
      </StickyNav>
    </Flex>
  )
}

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
    background: ${(p) => p.theme.background};
  }
`

const PrimaryText = styled.span<{ selected?: boolean }>`
  color: ${(p) => (p.selected ? p.theme.primaryText : p.theme.primaryTextAchromatic)};
`
