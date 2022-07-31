import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
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

const limit = 10
const description = ''

export default function PostsPage() {
  const [hasMoreData, setHasMoreData] = useState(true)
  const router = useRouter()

  function goToPostCreationPage() {
    if (window.sessionStorage.getItem('jwt') || window.localStorage.getItem('jwt')) {
      router.push('/post/create')
    } else {
      toast.info('로그인이 필요합니다')
      sessionStorage.setItem('redirectToAfterLogin', '/post/create')
      router.push('/login')
    }
  }

  return (
    <PageHead title="모임 - 자유담" description={description}>
      <button>모임</button>
    </PageHead>
  )
}
