import React from 'react'
import PageHead from 'src/components/PageHead'
import { NAVIGATION_HEIGHT, TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

export const PrimaryH3 = styled.h3`
  color: ${(p) => p.theme.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

const GridContainerPost = styled.ul`
  display: grid;
  gap: 0.9rem;
  padding: 0.6rem;

  background: #fff;
`

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  box-shadow: 0px 4px 20px rgba(16, 16, 16, 0.25);
  border-radius: 99px;
  color: #fff;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const FixedButton = styled(PrimaryButton)`
  position: fixed;
  bottom: ${NAVIGATION_HEIGHT};
  right: 50%;
  transform: translateX(50vw);

  margin: 1.25rem;
  padding: 0.7rem 1.2rem;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    transform: translateX(230%);
  }
`

const limit = 10
const description = ''

export default function PostsPage() {
  return (
    <PageHead title="이야기 - 자유담" description={description}>
      ㅁㄴㅇ
    </PageHead>
  )
}
