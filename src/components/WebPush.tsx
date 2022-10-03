import { ReactNode, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { NEXT_PUBLIC_VAPID_PUBLIC_KEY } from '../utils/constants'
import { serviceWorker } from '../utils/recoil'

type Props = {
  children: ReactNode
}

export default function WebPush({ children }: Props) {
  // Web push
  const setServiceWorker = useSetRecoilState(serviceWorker)

  useEffect(() => {
    let registration: ServiceWorkerRegistration | null | undefined
    let pushSubscription: PushSubscription | null

    subscribe()
    async function subscribe() {
      registration = await navigator.serviceWorker.getRegistration()
      if (!registration) return

      pushSubscription = await registration.pushManager?.getSubscription()
      if (!pushSubscription)
        pushSubscription = await registration.pushManager.subscribe({
          applicationServerKey: NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          userVisibleOnly: true,
        })

      setServiceWorker({
        serviceWorkerRegistration: registration,
        pushSubscription: pushSubscription,
      })
    }

    return () => {
      unsubscribe()
      async function unsubscribe() {
        const unsubscribed = await pushSubscription?.unsubscribe()

        setServiceWorker({
          serviceWorkerRegistration: registration,
          pushSubscription: null,
        })
      }
    }
  }, [setServiceWorker])

  return <>{children}</>
}
