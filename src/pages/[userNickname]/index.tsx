import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import { getUserNickname } from 'src/utils'
import { currentUser } from 'src/utils/recoil'

const notificationLimit = 10
const description = '알파카의 정보를 알아보세요'

export default function UserPage() {
  // 로그인 필요
  // useNeedToLogin()

  const router = useRouter()
  const userNickname = getUserNickname(router)
  const { nickname } = useRecoilValue(currentUser)

  return (
    <PageHead title={`@${userNickname} - 자유담`} description={description}>
      ㅁㄴㅇ
    </PageHead>
  )
}
