/* eslint-disable no-undef */
import { useMutation } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { toastError } from '../apollo/error'
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_VAPID_PUBLIC_KEY } from '../common/constants'
import { currentUser, serviceWorker } from '../common/recoil'

type Props = {
  children: ReactNode
}

export default function WebPush({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Web push
  const setServiceWorker = useSetRecoilState(serviceWorker)

  const { mutate: createPushSubscription } = useMutation<unknown, Error, PushSubscriptionJSON>(
    async (pushSubscription) =>
      fetch(`${NEXT_PUBLIC_BACKEND_URL}/chat/push`, {
        method: 'POST',
        headers: {
          authorization:
            globalThis.sessionStorage?.getItem('jwt') ??
            globalThis.localStorage?.getItem('jwt') ??
            '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pushSubscription }),
      }),
    { onError: toastError }
  )

  const { mutate: deletePushSubscription } = useMutation(
    async (pushSubscription) =>
      fetch(`${NEXT_PUBLIC_BACKEND_URL}/chat/push`, {
        method: 'POST',
        headers: {
          authorization:
            globalThis.sessionStorage?.getItem('jwt') ??
            globalThis.localStorage?.getItem('jwt') ??
            '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pushSubscription }),
      }),
    { onError: toastError }
  )

  useEffect(() => {
    let registration: ServiceWorkerRegistration | null | undefined
    let pushSubscription: PushSubscription | null

    async function getPushSubscription() {
      registration = await navigator.serviceWorker.getRegistration()
      if (!registration) return

      pushSubscription = await registration.pushManager?.getSubscription()
      if (!pushSubscription)
        pushSubscription = await registration.pushManager.subscribe({
          applicationServerKey: NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          userVisibleOnly: true,
        })

      const pushSubscriptionInfo = pushSubscription.toJSON()
      if (!pushSubscriptionInfo.endpoint || !pushSubscriptionInfo.keys) return

      createPushSubscription(pushSubscriptionInfo)

      setServiceWorker({
        serviceWorkerRegistration: registration,
        pushSubscription: pushSubscription,
      })
    }

    async function removePushSubscription() {
      const unsubscribed = await pushSubscription?.unsubscribe()
      if (!unsubscribed) return

      deletePushSubscription()

      setServiceWorker({
        serviceWorkerRegistration: registration,
        pushSubscription: null,
      })
    }

    if (name) {
      getPushSubscription()

      return () => {
        removePushSubscription()
      }
    }
  }, [createPushSubscription, deletePushSubscription, name, setServiceWorker])

  return <>{children}</>
}
