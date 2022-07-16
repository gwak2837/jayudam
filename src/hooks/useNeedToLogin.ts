import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { currentUser } from 'src/utils/recoil'

export default function useNeedToLogin(when?: boolean) {
  const { nickname } = useRecoilValue(currentUser)
  const router = useRouter()

  useEffect(() => {
    if (!nickname && when) {
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn('로그인이 필요합니다')
      router.replace('/login')
    }
  }, [nickname, router, when])

  return nickname
}
