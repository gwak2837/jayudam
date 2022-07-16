import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getUserNickname } from 'src/utils'
import { currentUser } from 'src/utils/recoil'

export default function UserPage() {
  const router = useRouter()
  const userNickname = getUserNickname(router)
  const { nickname } = useRecoilValue(currentUser)

  useNeedToLogin(nickname === null)

  useEffect(() => {
    if (nickname === undefined) {
      router.replace('/register')
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn('닉네임 설정이 필요합니다')
    }
  }, [nickname, router])

  return (
    <PageHead title={`@${userNickname} - 자유담`} description="">
      <Navigation>{nickname}</Navigation>
    </PageHead>
  )
}
