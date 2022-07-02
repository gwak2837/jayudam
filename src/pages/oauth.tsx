import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/PageHead'
import Navigation from 'src/layouts/Navigation'

const description = ''

export default function OAuthPage() {
  const queryString = useRef<URLSearchParams>()
  const url = useRef('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    queryString.current = new URLSearchParams(location.search)
    const jwt = queryString.current.get('jwt')

    if (jwt) {
      if (sessionStorage.getItem('autoLogin')) {
        localStorage.setItem('jwt', jwt)
        sessionStorage.removeItem('autoLogin')
      } else {
        sessionStorage.setItem('jwt', jwt)
      }

      const redirectionUrlAfterLogin = sessionStorage.getItem('redirectionUrlAfterLogin') ?? '/'
      sessionStorage.removeItem('redirectionUrlAfterLogin')

      if (redirectionUrlAfterLogin === '/@') {
        const nickname = queryString.current.get('nickname')
        url.current = `/@${nickname}`
      } else {
        url.current = redirectionUrlAfterLogin
      }

      toast.success('소셜 로그인에 성공했어요')
      return
    }

    const doesJWTExpired = queryString.current.get('doesJWTExpired')

    if (doesJWTExpired) {
      url.current = '/login'
      toast.warn('JWT 유효기간이 지났어요. 다시 로그인해주세요')
      return
    }

    setLoading(false)
  }, [])

  const router = useRouter()

  useEffect(() => {
    if (url.current) router.replace(url.current)
  }, [router])

  return (
    <PageHead title="소셜 로그인 - 자유담" description={description}>
      <Navigation>
        {loading ? (
          <div>사용자 인증을 진행하고 있습니다. 잠시만 기다려주세요...</div>
        ) : (
          queryString.current && <div>{getErrorMessage(queryString.current)}</div>
        )}
      </Navigation>
    </PageHead>
  )
}

function getErrorMessage(errorMessage: URLSearchParams) {
  if (errorMessage.get('isAlreadyAssociatedWithOAuth') === 'false') {
    switch (errorMessage.get('oauth')) {
      case 'kakao':
        return '카카오 계정과 연결된 자유담 계정이 존재하지 않아요'
      case 'naver':
        return '네이버 계정과 연결된 자유담 계정이 존재하지 않아요'
      case 'google':
        return '구글 계정과 연결된 자유담 계정이 존재하지 않아요'
      default:
        return '서버 응답이 잘못됐어요'
    }
  }

  if (errorMessage.get('isAlreadyAssociatedWithOAuth') === 'true') {
    switch (errorMessage.get('oauth')) {
      case 'kakao':
        return '이미 카카오 계정과 연결되어 있어요'
      case 'naver':
        return '이미 네이버 계정과 연결되어 있어요'
      case 'google':
        return '이미 구글 계정과 연결되어 있어요'
      default:
        return '서버 응답이 잘못됐어요'
    }
  }

  if (errorMessage.get('isBlocked') === 'true') {
    const from = errorMessage.get('from')
    const to = errorMessage.get('to')
    if (!from || !to) return '서버 응답이 잘못됐어요'

    const fromDate = new Date(from).toLocaleDateString()
    const toDate = new Date(to).toLocaleDateString()
    return `${fromDate} 부터 ${toDate} 까지 정지된 계정이에요`
  }

  if (errorMessage.get('jayudamUserMatchWithOAuthUser') === 'false') {
    switch (errorMessage.get('oauth')) {
      case 'kakao':
        return '카카오 계정 정보가 자유담 계정과 일치하지 않아요'
      case 'naver':
        return '네이버 계정 정보가 자유담 계정과 일치하지 않아요'
      case 'google':
        return '구글 계정 정보가 자유담 계정과 일치하지 않아요'
      default:
        return '서버 응답이 잘못됐어요'
    }
  }
}
