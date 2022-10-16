import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { toastError } from '../../apollo/error'
import { NEXT_PUBLIC_BACKEND_URL } from '../../common/constants'
import LoginLink from '../../components/atoms/LoginLink'
import PageHead from '../../components/PageHead'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatPage() {
  useNeedToLogin()

  // Chatroom
  const { isLoading, isError, data, error } = useQuery(['chatrooms'], () =>
    fetchWithAuth('/chat/room', {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
  )

  useEffect(() => {
    if (isError) {
      console.log('👀 - error', error)
      // toast.warn(error)
    }
  }, [error, isError])

  console.log('👀 - data', data)

  // Message
  const [messages, setMessages] = useState(['Hello world!'])

  const [sending, setSending] = useState('')

  const { mutate } = useMutation(
    async () =>
      fetchWithAuth('/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatroomId: 'chatroomId',
          message: {
            content: sending,
            type: 0,
          },
        }),
      }),
    { onError: toastError }
  )

  function send(e: any) {
    e.preventDefault()
    console.log('submit')
    mutate()
  }

  function test(e: any) {
    fetch(`${NEXT_PUBLIC_BACKEND_URL}/chat/test`, {
      method: 'POST',
      headers: {
        authorization:
          globalThis.sessionStorage?.getItem('jwt') ??
          globalThis.localStorage?.getItem('jwt') ??
          '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          content: sending,
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

          <ul>
            {data?.map((chatroom: any) => (
              <li key={chatroom.id}>
                <Link href={`/chat/${chatroom.id}`}>
                  <div>{chatroom.name}</div>
                  <div>{chatroom.imageUrl}</div>
                  <div>{chatroom.unreadCount}</div>
                  <div>{chatroom.lastChat.content}</div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </Navigation>
    </PageHead>
  )
}
