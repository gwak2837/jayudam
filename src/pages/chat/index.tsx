import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { currentUser } from '../../common/recoil'
import PageHead from '../../components/PageHead'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatroomsPage() {
  useNeedToLogin()

  const { name } = useRecoilValue(currentUser)

  // Chatroom
  const { isLoading, isSuccess, data } = useQuery(
    ['chatrooms'],
    () => fetchWithAuth('/chat/room'),
    { enabled: Boolean(name) }
  )

  // Push 알림 테스트
  const [text, setText] = useState('')

  function test(e: any) {
    e.preventDefault()

    fetchWithAuth('/chat/test', {
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
                <li key={chatroom.id}>
                  <Link href={`/chat/${chatroom.id}`}>
                    <div>{chatroom.name}</div>
                    <div>{chatroom.imageUrl}</div>
                    <div>{chatroom.unreadCount}</div>
                    <div>{chatroom.lastChat.content}</div>
                  </Link>
                </li>
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
