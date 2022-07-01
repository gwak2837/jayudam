import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import PageHead from 'src/components/PageHead'
import { getUserNickname } from 'src/utils'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

const description = '알파카의 정보를 알아보세요'

export default function UserPage() {
  const [isProfileImageUpdating, setIsProfileImageUpdating] = useState(false)
  const router = useRouter()
  const userNickname = getUserNickname(router)
  const { nickname } = useRecoilValue(currentUser)
  const resetCurrentUser = useResetRecoilState(currentUser)

  return (
    <PageHead title={`@${userNickname} - 자유담`} description={description}>
      <FlexContainerHeight100>
        <div>123</div>
      </FlexContainerHeight100>
    </PageHead>
  )
}

const FlexContainerHeight100 = styled.div`
  display: flex;
  flex-flow: column;

  > :last-child {
    flex-grow: 1;
  }
`
