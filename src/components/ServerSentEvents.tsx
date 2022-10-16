import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'
import { fetchWithAuth } from '../utils/fetch'

type Props = {
  children: ReactNode
}

export default function ServerSentEvents({ children }: Props) {
  // All my chatroom id
  const { isLoading, isError, data, error } = useQuery(['chatroomIds'], () =>
    fetchWithAuth('/chat/room', {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
  )

  // EventSource
  const eventSource = useRef<EventSource>()

  useEffect(() => {
    if (!data || error) return

    const jwt =
      globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

    if (!jwt) return

    eventSource.current = new EventSource(
      `${NEXT_PUBLIC_BACKEND_URL}/chat/subscribe?${new URLSearchParams({
        jwt,
        chatroomIds: JSON.stringify(data),
      })}`
    )

    eventSource.current.onopen = (e) => {
      console.log('👀 - onopen', e)
      toast.success('EventSource 연결 성공')
    }

    eventSource.current.onerror = (e) => {
      console.log('👀 - onerror', e)
      toast.warn('EventSource 연결 오류')
    }

    return () => {
      if (eventSource.current) {
        eventSource.current.close()
      }
    }
  }, [])

  return <>{children}</>
}
