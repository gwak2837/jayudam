import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getUserNickname } from 'src/utils'
import { currentUser } from 'src/utils/recoil'

export default function UserPage() {
  useNeedToLogin()

  const router = useRouter()
  const userNickname = getUserNickname(router)
  const { nickname } = useRecoilValue(currentUser)

  return (
    <PageHead title={`@${userNickname} - 자유담`} description="">
      <Navigation>{nickname}</Navigation>
    </PageHead>
  )
}
