import Image from 'next/future/image'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import PageHead from '../../components/PageHead'
import { useLogoutMutation, useUserQuery } from '../../graphql/generated/types-and-hooks'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import Navigation from '../../layouts/Navigation'
import GoogleLogo from '../../svgs/google-logo.svg'
import KakaoLogo from '../../svgs/kakao-logo.svg'
import NaverLogo from '../../svgs/naver-logo.svg'
import { getUsername } from '../../utils'
import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
  TABLET_MIN_WIDTH,
} from '../../utils/constants'
import { currentUser } from '../../utils/recoil'
import { GoogleButton, KakaoButton, NaverButton } from '../login'

export default function UserPage() {
  const router = useRouter()
  const username = getUsername(router)
  const [{ name: currentUsername }, setCurrentUser] = useRecoilState(currentUser)

  useNeedToLogin(currentUsername === null)

  useEffect(() => {
    if (currentUsername === undefined) {
      router.replace('/register')
      sessionStorage.setItem('redirectToAfterLogin', router.asPath)
      toast.warn('닉네임 설정이 필요합니다')
    }
  }, [currentUsername, router])

  // 사용자 데이터 가져오기
  const {
    data,
    loading: userLoading,
    error,
  } = useUserQuery({
    onError: toastApolloError,
    skip: !username || username === 'null' || username === 'undefined',
    variables: {
      name: username === currentUsername ? null : username,
    },
  })

  const user = data?.user

  // Logout
  const [logoutMutation, { loading: logoutLoading }] = useLogoutMutation({
    onCompleted: ({ logout }) => {
      if (logout) {
        globalThis.sessionStorage?.removeItem('jwt')
        globalThis.localStorage?.removeItem('jwt')
        setCurrentUser({ name: null })
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
    <PageHead title={`@${username} - 자유담`} description="">
      <Navigation>
        <MinWidth>
          {user ? (
            <>
              <ScrollResponsiveImage
                coverSrc={user.coverImageUrls?.[0] ?? '/images/cover.png'}
                profileSrc={user.imageUrls?.[0] ?? '/images/profile.jpeg'}
              />

              {username}
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
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>
              <div>내 문서</div>

              {/* <pre style={{ overflow: 'scroll', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre> */}
            </>
          ) : (
            <div>해당 사용자는 존재하지 않아요</div>
          )}

          {userLoading && <div>사용자 정보를 불러오고 있습니다</div>}
        </MinWidth>
      </Navigation>
    </PageHead>
  )
}

function ScrollResponsiveImage({ coverSrc, profileSrc }: any) {
  useLayoutEffect(() => {
    function setScrollY() {
      const scrollY = ~~window.scrollY
      if (scrollY < 500) document.body.style.setProperty('--scroll', `${scrollY}px`)
    }
    window.addEventListener('scroll', setScrollY, { passive: true })

    return () => window.removeEventListener('scroll', setScrollY)
  }, [])

  return (
    <>
      <StickyOuter>
        <CoverImage src={coverSrc} alt="user cover" fill />
        <StickyInner></StickyInner>
      </StickyOuter>
      <RelativeSquare>
        <ProfileImage src={profileSrc} alt="user profile" fill />
      </RelativeSquare>
    </>
  )
}

const MinWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
`

const HEADER_MAX_HEIGHT = '250px'
const HEADER_MIN_HEIGHT = '3rem'

const StickyOuter = styled.div`
  position: sticky;
  top: calc(${HEADER_MIN_HEIGHT} - ${HEADER_MAX_HEIGHT});

  height: ${HEADER_MAX_HEIGHT};

  display: flex;
  align-items: center;
`

const StickyInner = styled.div`
  position: sticky;
  top: 0;

  height: ${HEADER_MIN_HEIGHT};
  width: 100%;
  margin: 0 auto;
`

const CoverImage = styled(Image)`
  object-fit: cover;

  inset: auto !important;
  bottom: 0 !important;
  height: calc(100% - var(--scroll)) !important;
  min-height: ${HEADER_MIN_HEIGHT};
`

const RelativeSquare = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;

  margin: 0 auto;
  z-index: 1;
`

const ProfileImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  left: 50% !important;
  transform: translate(-50%, -50%);
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
