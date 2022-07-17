import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { currentUser } from 'src/utils/recoil'

export default function useNeedToLogin(when = true) {
  const { nickname, loading } = useRecoilValue(currentUser)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !nickname && when) {
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn(
        <div>
          로그인이 필요합니다. <Link href="/login">로그인하기</Link>
        </div>
      )
    }
  }, [nickname, router, when])

  return nickname
}
