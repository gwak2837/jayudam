import { useEffect, useRef } from 'react'

import PageHead from '../../components/PageHead'
import Navigation from '../../layouts/Navigation'
import { NEXT_PUBLIC_BACKEND_URL } from '../../utils/constants'

export default function ChatPage() {
  const eventSource = useRef<EventSource>()

  function connect() {
    eventSource.current = new EventSource(`${NEXT_PUBLIC_BACKEND_URL}/chat`)

    eventSource.current.onopen = (event) => {
      console.log('👀 - onopen', event)
    }

    eventSource.current.onmessage = (event) => {
      console.log('👀 - onmessage', event)
    }

    eventSource.current.onerror = (event) => {
      console.log('👀 - onerror', event)
    }
  }

  function disconnect() {
    if (eventSource.current) {
      eventSource.current.close()
      console.log('👀 - eventSource.current.readyState', eventSource.current.readyState)
    }
  }

  return (
    <PageHead title="대화 - 자유담" description="">
      <Navigation>
        <button onClick={connect}>들어가기</button>
        <button onClick={disconnect}>나가기</button>
      </Navigation>
    </PageHead>
  )
}
