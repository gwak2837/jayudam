import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useAuthQuery } from 'src/graphql/generated/types-and-hooks'
import { currentUser } from 'src/utils/recoil'

type Props = {
  children: ReactNode
}

function Authentication({ children }: Props) {
  const [{ nickname }, setCurrentUser] = useRecoilState(currentUser)

  useAuthQuery({
    onCompleted: ({ myNickname }) => {
      if (myNickname?.nickname) {
        setCurrentUser({ nickname: myNickname.nickname, loading: false })
      } else {
        setCurrentUser({ nickname: undefined, loading: false })
      }
    },
    onError: (error) => {
      toastApolloError(error)
      globalThis.sessionStorage?.removeItem('jwt')
      globalThis.localStorage?.removeItem('jwt')
    },
    // Storage에 jwt가 존재하는데 nickname이 없을 때만 요청
    skip: Boolean(
      nickname ||
        (!globalThis.sessionStorage?.getItem('jwt') && !globalThis.localStorage?.getItem('jwt'))
    ),
  })

  return <>{children}</>
}

export default Authentication
