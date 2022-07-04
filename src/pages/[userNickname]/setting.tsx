import { useRouter } from 'next/router'
import PageHead from 'src/components/PageHead'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import { getUserNickname } from 'src/utils'
import styled from 'styled-components'

export default function UserPage() {
  useNeedToLogin()

  const router = useRouter()
  const userNickname = getUserNickname(router)

  return (
    <PageHead title={`@${userNickname} - 자유담`} description="">
      <div>123</div>
    </PageHead>
  )
}
