/* eslint-disable no-undef */
import { useMutation } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import { toastError } from '../apollo/error'
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_VAPID_PUBLIC_KEY } from '../common/constants'
import { currentUser } from '../common/recoil'
import { enableNotificationAPI } from '../utils'
import { fetchWithAuth } from '../utils/fetch'

type Props = {
  children: ReactNode
}

export default function WebPush({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Web Push
  const { mutate: createPushSubscriptionM } = useMutation<unknown, Error, PushSubscriptionJSON>(
    (pushSubscription) =>
      fetchWithAuth('/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pushSubscription }),
      }),
    { onError: toastError }
  )

  const { mutate: deletePushSubscriptionM } = useMutation(
    async () => fetchWithAuth('/push', { method: 'DELETE' }),
    { onError: toastError }
  )

  useEffect(() => {
    async function createPushSubscription() {
      registration = await navigator.serviceWorker.getRegistration()
      if (!registration || !registration.pushManager) return

      pushSubscription = await registration.pushManager.getSubscription()
      if (!pushSubscription) {
        const result = await enableNotificationAPI()
        if (!result) return toast.warn(m)

        pushSubscription = await registration.pushManager.subscribe({
          applicationServerKey: NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          userVisibleOnly: true,
        })
      }

      const pushSubscriptionInfo = pushSubscription.toJSON()
      if (!pushSubscriptionInfo.endpoint || !pushSubscriptionInfo.keys) return

      createPushSubscriptionM(pushSubscriptionInfo)
    }

    async function deletePushSubscription() {
      const unsubscribed = await pushSubscription?.unsubscribe()
      if (!unsubscribed) return

      deletePushSubscriptionM()
    }

    if (name) {
      createPushSubscription()

      return () => {
        deletePushSubscription()
      }
    }
  }, [createPushSubscriptionM, deletePushSubscriptionM, name])

  // HTTP/2 Server Push
  useEffect(() => {
    if (!name) return

    const jwt =
      globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

    if (!jwt) return

    function openEventSource() {
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
    }

    window.addEventListener('focus', openEventSource)
    window.addEventListener('blur', closeEventSource)

    return () => {
      window.removeEventListener('focus', openEventSource)
      window.removeEventListener('blur', closeEventSource)
    }
  }, [name])

  return <>{children}</>
}

export let registration: ServiceWorkerRegistration | null | undefined
export let pushSubscription: PushSubscription | null
export let eventSource: EventSource | undefined

const m = (
  <div>
    브라우저 알림을 사용할 수 없습니다{' '}
    <a
      href="https://jayudam.notion.site/1ce3f0eba60848fda440ab758fff336d"
      target="_blank"
      rel="noreferrer"
    >
      해결하기
    </a>
  </div>
)

function closeEventSource() {
  if (eventSource) {
    eventSource.close()
  }
}
