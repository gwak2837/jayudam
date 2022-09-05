import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import LoginLink from '../components/atoms/LoginLink'

export default function useNeedToLogin(when = true) {
  const router = useRouter()

  const jwt = useMemo(
    () => globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt'),
    []
  )

  useEffect(() => {
    if (!jwt && when) {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }, [jwt, router, when])
}
