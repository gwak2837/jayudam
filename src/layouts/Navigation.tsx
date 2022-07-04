import Link from 'next/link'
import { ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

function Navigation({ children }: Props) {
  const { nickname } = useRecoilValue(currentUser)

  return (
    <>
      {children}
      <StickyNav>
        <Link href="/verify">인증</Link>
        <Link href="/qrcode">QR Code</Link>
        <Link href="/">홈</Link>
        <Link href="/post">이야기</Link>
        <Link href={`/@${nickname}`}>my 자유담</Link>
      </StickyNav>
    </>
  )
}

export default Navigation

const StickyNav = styled.nav`
  position: sticky;
  bottom: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #fff;
  border-top: 1px solid #26ade3;

  > a {
    padding: 1rem;
    text-align: center;
  }
`
