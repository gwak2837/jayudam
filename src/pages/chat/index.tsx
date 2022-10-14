import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import LoginLink from '../../components/atoms/LoginLink'
import PageHead from '../../components/PageHead'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import { NEXT_PUBLIC_BACKEND_URL } from '../../utils/constants'

export default function ChatPage() {
  useNeedToLogin()

  // Event Source
  const eventSource = useRef<EventSource>()

  function connect() {
    const jwt =
      globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

    if (!jwt) {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
      return
    }

    const querystring = new URLSearchParams({
      jwt,
      chatroomIds: "['1', '2', '3']",
    })

    eventSource.current = new EventSource(
      `${NEXT_PUBLIC_BACKEND_URL}/chat/subscribe?${querystring}`
    )

    eventSource.current.onopen = (e) => {
      console.log('👀 - onopen', e)
    }

    eventSource.current.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data])
    }

    eventSource.current.onerror = (e) => {
      toast.warn('EventSource 연결 오류')
    }

    eventSource.current.addEventListener('timeout', (e) => {
      console.log('👀 - timeout', e)
    })
  }

  function disconnect() {
    if (eventSource.current) {
      eventSource.current.close()
    }
  }

  // Message
  const [messages, setMessages] = useState(['Hello world!'])

  const [sending, setSending] = useState('')

  const { mutate } = useMutation(async () =>
    fetch(`${NEXT_PUBLIC_BACKEND_URL}/chat/send`, {
      method: 'POST',
      headers: {
        authorization:
          globalThis.sessionStorage?.getItem('jwt') ??
          globalThis.localStorage?.getItem('jwt') ??
          '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatroomId: 'chatroomId',
        message: {
          content: sending,
          type: 0,
        },
      }),
    })
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
        <main>
          <div>
            <button onClick={connect}>들어가기</button>
            <button onClick={disconnect}>나가기</button>
            <button onClick={test}>테스트</button>
          </div>
          <form onSubmit={send}>
            <input value={sending} onChange={(e) => setSending(e.target.value)} />
          </form>
          <ul>
            {messages.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </main>
      </Navigation>
    </PageHead>
  )
}
