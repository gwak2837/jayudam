import { useQuery } from '@tanstack/react-query'
import Image from 'next/future/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { currentUser } from '../../common/recoil'
import { FlexCenter, FlexColumn } from '../../components/atoms/Flex'
import PageHead from '../../components/PageHead'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatroomsPage() {
  useNeedToLogin()

  const { name } = useRecoilValue(currentUser)

  // Chatroom
  const { isLoading, isSuccess, data } = useQuery(['chatrooms'], () => fetchWithAuth('/chatroom'), {
    enabled: Boolean(name),
  })

  // Push 알림 테스트
  const [text, setText] = useState('')

  function test(e: any) {
    e.preventDefault()

    fetchWithAuth('/push/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          content: text,
          type: 0,
        },
      }),
    })
      .then((result) => toast.info(result.message))
      .catch((err) => console.error(err))
  }

  return (
    <PageHead title="대화 - 자유담" description="">
      <Navigation>
        <main>
          <form onSubmit={test}>
            <input onChange={(e) => setText(e.target.value)} value={text} />
          </form>

          <ul>
            {isLoading && <li>불러오는 중</li>}
            {isSuccess &&
              data.map((chatroom: any) => (
                <Padding key={chatroom.id}>
                  <FlexLink href={`/chat/${chatroom.id}`}>
                    <SqureImage
                      src={chatroom.imageUrl ?? '/images/shortcut-icon.webp'}
                      alt={chatroom.imageUrl ?? 'chatroom-image'}
                      width="64"
                      height="64"
                    />
                    <FlexGrow1>
                      <div>{chatroom.name}</div>
                      <div>{chatroom.lastChat.content ?? <br />}</div>
                    </FlexGrow1>
                    <FlexCenter>
                      <RedCircles>{chatroom.unreadCount}</RedCircles>
                    </FlexCenter>
                  </FlexLink>
                </Padding>
              ))}
          </ul>
        </main>
      </Navigation>
    </PageHead>
  )
}

const Padding = styled.li`
  border: 1px solid ${(p) => p.theme.shadow};
  padding: 1rem;

  :hover {
    background: ${(p) => p.theme.shadow};
  }
`

const SqureImage = styled(Image)`
  border-radius: 50%;
`

const FlexLink = styled(Link)`
  display: flex;
  gap: 1rem;
`

const FlexGrow1 = styled(FlexColumn)`
  justify-content: center;
  flex: 1;
`

const RedCircles = styled.div`
  background: ${(p) => p.theme.error};
  border-radius: 99px;
  color: #fff;
  padding: 0 0.5rem;
`
