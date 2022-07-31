import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

export default function useNeedToLogin(when = true) {
  const router = useRouter()

  const jwt = useMemo(
    () => globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt'),
    []
  )

  useEffect(() => {
    if (!jwt && when) {
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn(
        <div>
          로그인이 필요합니다. <Link href="/login">로그인하기</Link>
        </div>
      )
    }
  }, [jwt, router, when])
}
