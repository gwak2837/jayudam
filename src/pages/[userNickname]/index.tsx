import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { useLogoutMutation, useUserQuery } from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getUserNickname } from 'src/utils'
import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
  TABLET_MIN_WIDTH,
} from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import GoogleLogo from '../../svgs/google-logo.svg'
import KakaoLogo from '../../svgs/kakao-logo.svg'
import NaverLogo from '../../svgs/naver-logo.svg'
import { GoogleButton, KakaoButton, NaverButton } from '../login'

export default function UserPage() {
  const router = useRouter()
  const userNickname = getUserNickname(router)
  const [{ nickname }, setCurrentUser] = useRecoilState(currentUser)

  useNeedToLogin(nickname === null)

  useEffect(() => {
    if (nickname === undefined) {
      router.replace('/register')
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn('닉네임 설정이 필요합니다')
    }
  }, [nickname, router])

  const { data, loading: userLoading } = useUserQuery({
    onError: toastApolloError,
    skip: userNickname === 'null' || userNickname === 'undefined',
    variables: { nickname: userNickname === nickname ? null : userNickname },
  })

  const [logoutMutation, { loading: logoutLoading }] = useLogoutMutation({
    onCompleted: ({ logout }) => {
      if (logout) {
        globalThis.sessionStorage?.removeItem('jwt')
        globalThis.localStorage?.removeItem('jwt')
        setCurrentUser({ nickname: null })
        toast.success(
          <div>
            로그아웃 성공 <br />
            {new Date(logout.logoutTime).toLocaleString()}
          </div>
        )
      }
    },
    onError: toastApolloError,
  })

  function logout() {
    logoutMutation()
  }

  return (
    <PageHead title={`@${userNickname} - 자유담`} description="">
      <Navigation>
        <MinWidth>
          <pre style={{ overflow: 'scroll', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
          {nickname && (
            <>
              {nickname}
              <button disabled={logoutLoading} onClick={logout}>
                로그아웃
              </button>

              <button>팔로우</button>
              <button>선물하기</button>

              <KakaoButton disabled={logoutLoading} onClick={goToKakaoLoginPage}>
                <KakaoLogo />
                카카오톡 연결하기
              </KakaoButton>

              <NaverButton disabled={logoutLoading} onClick={goToNaverLoginPage}>
                <NaverLogo />
                네이버 연결하기
              </NaverButton>

              <GoogleButton disabled={logoutLoading} onClick={goToGoogleLoginPage}>
                <GoogleLogo />
                Google 연결하기
              </GoogleButton>

              <div>내 인증기록</div>

              <div>내 문서</div>
            </>
          )}
        </MinWidth>
      </Navigation>
    </PageHead>
  )
}

const MinWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
`

function goToKakaoLoginPage() {
  const querystring = new URLSearchParams({
    response_type: 'code',
    client_id: NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: `${NEXT_PUBLIC_BACKEND_URL}/oauth/kakao/register`,
    state: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
  })
  window.location.replace(`https://kauth.kakao.com/oauth/authorize?${querystring}`)
}

function goToNaverLoginPage() {
  const querystring = new URLSearchParams({
    response_type: 'code',
    client_id: NEXT_PUBLIC_NAVER_CLIENT_ID,
    redirect_uri: `${NEXT_PUBLIC_BACKEND_URL}/oauth/naver/register`,
    state: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
  })
  window.location.replace(`https://nid.naver.com/oauth2.0/authorize?${querystring}`)
}

function goToGoogleLoginPage() {
  const querystring = new URLSearchParams({
    response_type: 'code',
    client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: `${NEXT_PUBLIC_BACKEND_URL}/oauth/google/register`,
    scope: 'email+profile+openid',
    state: sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt') ?? '',
  })
  window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?${querystring}`)
}
