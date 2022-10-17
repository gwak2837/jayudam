/* eslint-disable no-undef */
import { useMutation } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import { toastError } from '../apollo/error'
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_VAPID_PUBLIC_KEY } from '../common/constants'
import { currentUser } from '../common/recoil'
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
    let registration: ServiceWorkerRegistration | null | undefined
    let pushSubscription: PushSubscription | null

    async function createPushSubscription() {
      registration = await navigator.serviceWorker.getRegistration()
      console.log('👀 - registration', registration)
      if (!registration) return

      pushSubscription = await registration.pushManager?.getSubscription()
      if (!pushSubscription)
        pushSubscription = await registration.pushManager.subscribe({
          applicationServerKey: NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          userVisibleOnly: true,
        })

      const pushSubscriptionInfo = pushSubscription.toJSON()
      console.log('👀 - pushSubscriptionInfo', pushSubscriptionInfo)
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

    const eventSource = new EventSource(
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
      }
    }
  }, [name])

  return <>{children}</>
}
