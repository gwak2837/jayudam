import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { currentUser } from '../../common/recoil'
import { FlexCenter, FlexColumn, TextOverflow as TextOverflow_ } from '../../components/atoms/Flex'
import PageHead from '../../components/PageHead'
import { eventSource, pushSubscription } from '../../components/WebPush'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatroomsPage() {
  useNeedToLogin()

  const { name } = useRecoilValue(currentUser)

  // Web Push 알림 테스트
  const [text, setText] = useState('')

  async function test(e: any) {
    e.preventDefault()

    if (!pushSubscription) return toast.warn('브라우저 알림 기능을 사용할 수 없습니다')

    const result = await fetchWithAuth('/push/test', {
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

    toast.info(result.message)
  }

  // HTTP/2 Push
  useEffect(() => {
    function a(e: any) {
      console.log('👀 - e', e)
    }

    eventSource?.addEventListener('chatroom', a)

    return () => {
      eventSource?.removeEventListener('chatroom', a)
    }
  }, [])

  // Chatroom
  const { isLoading, isSuccess, data } = useQuery(['chatroom'], () => fetchWithAuth('/chatroom'), {
    enabled: Boolean(name),
  })

  return (
    <PageHead title="대화방 - 자유담" description="">
      <Navigation>
        <main style={{ overflow: 'auto' }}>
          <form onSubmit={test}>
            <input onChange={(e) => setText(e.target.value)} value={text} />
          </form>

          <ul>
            {isLoading && <li>불러오는 중</li>}
            {isSuccess &&
              data.map((chatroom: any) => (
                <Padding key={chatroom.id}>
                  <FlexLink href={`/chatroom/${chatroom.id}`}>
                    <SqureImage
                      src={chatroom.otherUser?.imageUrl || '/images/shortcut-icon.webp'}
                      alt={chatroom.otherUser?.imageUrl || 'chatroom-image'}
                      width="64"
                      height="64"
                    />
                    <FlexGrow1>
                      <TextOverflow>{chatroom.otherUser?.nickname}</TextOverflow>
                      <TextOverflow>{chatroom.lastChat.content ?? <br />}</TextOverflow>
                    </FlexGrow1>
                    {+chatroom.unreadCount > 0 && (
                      <FlexCenter>
                        <RedCircles>{chatroom.unreadCount}</RedCircles>
                      </FlexCenter>
                    )}
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
  gap: 0.5rem;
  flex: 1;

  min-width: 0;
`

const RedCircles = styled.div`
  background: ${(p) => p.theme.error};
  border-radius: 99px;
  color: #fff;
  padding: 0 0.5rem;
`

const TextOverflow = styled(TextOverflow_)`
  min-width: 2rem;
`
