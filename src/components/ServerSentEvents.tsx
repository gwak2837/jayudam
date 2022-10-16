import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'
import { currentUser, eventSource } from '../common/recoil'
import { fetchWithAuth } from '../utils/fetch'

type Props = {
  children: ReactNode
}

export default function ServerSentEvents({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // All my chatroom id
  const { isLoading, isError, data, error } = useQuery(
    ['chatroomIds'],
    () => fetchWithAuth('/chat/room-id'),
    { enabled: Boolean(name) }
  )

  // EventSource
  const setEventSource = useSetRecoilState(eventSource)

  useEffect(() => {
    if (!name || isLoading || isError || !data) return

    const jwt =
      globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

    if (!jwt) return

    const eventSource = new EventSource(
      `${NEXT_PUBLIC_BACKEND_URL}/chat/subscribe?${new URLSearchParams({
        jwt,
        chatroomIds: JSON.stringify(data),
      })}`
    )

    eventSource.onopen = () => {
      toast.success('EventSource 연결 성공')
    }

    eventSource.onerror = (e) => {
      console.log('👀 - onerror', e)
      toast.warn('EventSource 연결 오류')
    }

    setEventSource(eventSource)

    return () => {
      eventSource.close()
      setEventSource(null)
    }
  }, [data, error, isError, isLoading, name, setEventSource])

  return <>{children}</>
}
