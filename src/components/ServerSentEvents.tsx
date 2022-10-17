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

  return <>{children}</>
}
