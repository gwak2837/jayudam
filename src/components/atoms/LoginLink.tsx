import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LoginLink() {
  const router = useRouter()

  return (
    <Link
      href="/login"
      onClick={() => sessionStorage.setItem('redirectToAfterLogin', router.asPath)}
    >
      로그인하기
    </Link>
  )
}
