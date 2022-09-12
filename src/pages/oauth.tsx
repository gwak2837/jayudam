import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { client } from '../apollo/client'
import LoginLink from '../components/atoms/LoginLink'
import PageHead from '../components/PageHead'
import Navigation from '../layouts/Navigation'

const description = ''

export default function OAuthPage() {
  const queryString = useRef<URLSearchParams>()
  const url = useRef('')
  const [loading, setLoading] = useState(true)
  const [doRedirect, setDoRedirect] = useState(false)

  useEffect(() => {
    queryString.current = new URLSearchParams(location.search)
    const jwt = queryString.current.get('jwt')

    if (!jwt) {
      const doesJWTExpired = queryString.current.get('doesJWTExpired')

      if (doesJWTExpired) {
        url.current = '/login'
        toast.warn(
          <div>
            로그인이 만료됐어요. 다시 <LoginLink />
          </div>
        )
        return
      }

      setLoading(false)
      return
    }

    if (sessionStorage.getItem('autoLogin')) {
      localStorage.setItem('jwt', jwt)
      sessionStorage.removeItem('autoLogin')
    } else {
      sessionStorage.setItem('jwt', jwt)
    }

    const username = queryString.current.get('username')

    if (!username) {
      url.current = '/register'
    } else {
      const redirectToAfterLogin = sessionStorage.getItem('redirectToAfterLogin') ?? '/'

      if (redirectToAfterLogin === '/@null' || redirectToAfterLogin === '/@undefined') {
        url.current = `/@${username}`
      } else {
        url.current = redirectToAfterLogin
      }
    }

    client
      .refetchQueries({
        include: ['Auth'],
      })
      .then(() => {
        setDoRedirect(true)
        toast.success('소셜 로그인 성공')
      })
      .catch((error) => console.error(error))
  }, [])

  // 해당 페이지로 이동하기
  const router = useRouter()

  useEffect(() => {
    if (url.current && doRedirect) {
      sessionStorage.removeItem('redirectToAfterLogin')
      router.replace(url.current)
    }
  }, [doRedirect, router])

  if (router.locale === 'en') {
    return (
      <PageHead title="Social login - Jayudam" description={description}>
        <Navigation>
          {loading ? (
            <div>User authentication is in progress. Please wait a momentarily..</div>
          ) : (
            queryString.current && <div>{getErrorMessage(queryString.current)}</div>
          )}
        </Navigation>
      </PageHead>
    )
  }

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

  if (errorMessage.get('isAdult') === 'false') {
    return '자유담은 성인만 가입할 수 있어요'
  }
}
