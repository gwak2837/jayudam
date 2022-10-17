import { ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'
import { currentUser } from '../common/recoil'

type Props = {
  children: ReactNode
}

export default function ServerSentEvents({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // EventSource

  useEffect(() => {
    if (!name) return

    const jwt =
      globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

    if (!jwt) return

    eventSource = new EventSource(
      `${NEXT_PUBLIC_BACKEND_URL}/subscribe?${new URLSearchParams({ jwt })}`
    )

    eventSource.onopen = () => {
      toast.success('EventSource 연결 성공')
    }

    eventSource.onerror = (e) => {
      console.log('👀 - onerror', e)
      toast.warn('EventSource 연결 오류')
    }

    return () => {
      if (eventSource) {
        eventSource.close()
        eventSource = null
      }
    }
  }, [name])

  return <>{children}</>
}

export let eventSource: EventSource | null = null
