import { ReactNode, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { toastApolloError } from '../../apollo/error'
import {
  useCreatePushSubscriptionMutation,
  useDeletePushSubscriptionMutation,
} from '../../graphql/generated/types-and-hooks'
import { NEXT_PUBLIC_VAPID_PUBLIC_KEY } from '../../utils/constants'
import { currentUser, serviceWorker } from '../../utils/recoil'

type Props = {
  children: ReactNode
}

export default function WebPush({ children }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Web push
  const setServiceWorker = useSetRecoilState(serviceWorker)

  const [createPushMutation] = useCreatePushSubscriptionMutation({
    onError: toastApolloError,
  })

  const [deletePushMutation] = useDeletePushSubscriptionMutation({
    onError: toastApolloError,
  })

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

      createPushMutation({
        variables: {
          input: {
            endpoint: pushSubscription.endpoint,
            expirationTime: pushSubscriptionInfo.expirationTime,
            keys: pushSubscriptionInfo.keys as any,
          },
        },
      })

      setServiceWorker({
        serviceWorkerRegistration: registration,
        pushSubscription: pushSubscription,
      })
    }

    async function removePushSubscription() {
      const unsubscribed = await pushSubscription?.unsubscribe()
      if (!unsubscribed) return

      deletePushMutation()

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
  }, [createPushMutation, deletePushMutation, name, setServiceWorker])

  return <>{children}</>
}
