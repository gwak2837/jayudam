import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'

import { toastError } from '../apollo/error'
import { bootChanneltalk } from '../common/channel-talk'
import { NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY } from '../common/constants'
import { currentUser } from '../common/recoil'
import { useAuthQuery } from '../graphql/generated/types-and-hooks'

type Props = {
  children: ReactNode
}

export default function Authentication({ children }: Props) {
  const [{ name }, setCurrentUser] = useRecoilState(currentUser)

  useAuthQuery({
    onCompleted: ({ auth: user }) => {
      if (user?.name) {
        setCurrentUser({ name: user.name })
        bootChanneltalk({
          pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
          // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
          profile: {
            name: user.name,
          },
        })
      } else if (user) {
        setCurrentUser({ name: undefined })
        bootChanneltalk({
          pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
          // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
        })
      }
    },
    onError: (error) => {
      toastError(error)
      globalThis.sessionStorage?.removeItem('jwt')
      globalThis.localStorage?.removeItem('jwt')
      setCurrentUser({ name: null })
      bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
    },
    // Storage에 jwt가 존재하는데 nickname이 없을 때만
    skip: Boolean(
      name ||
        (!globalThis.sessionStorage?.getItem('jwt') && !globalThis.localStorage?.getItem('jwt'))
    ),
  })

  return <>{children}</>
}
