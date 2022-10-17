import { useQuery } from '@tanstack/react-query'
import Image from 'next/future/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { currentUser } from '../../common/recoil'
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
        <main style={{ overflow: 'auto' }}>
          <pre style={{ overflow: 'auto', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>

          <form onSubmit={test}>
            <input onChange={(e) => setText(e.target.value)} value={text} />
          </form>

          <ul>
            {isLoading && <li>불러오는 중</li>}
            {isSuccess ? (
              data.map((chatroom: any) => (
                <Padding key={chatroom.id}>
                  <FlexLink href={`/chat/${chatroom.id}`}>
                    <SqureImage
                      src={chatroom.imageUrl ?? '/images/shortcut-icon.webp'}
                      alt={chatroom.imageUrl}
                      width="100"
                      height="100"
                    />
                    <FlexGrow1>
                      <div>{chatroom.name}</div>
                      <div>{chatroom.lastChat.content}</div>
                    </FlexGrow1>
                    <div>{chatroom.unreadCount}</div>
                  </FlexLink>
                </Padding>
              ))
            ) : (
              <pre style={{ overflow: 'auto', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
            )}
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

const FlexGrow1 = styled.div`
  flex: 1;
`
