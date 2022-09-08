import Image from 'next/future/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import { Absolute as Absolute_, Relative as Relative_ } from '../../components/atoms/Flex'
import PageHead from '../../components/PageHead'
import { useLogoutMutation, useUserQuery } from '../../graphql/generated/types-and-hooks'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import useScroll from '../../hooks/useScroll'
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

  // 라우팅
  // useNeedToLogin(currentUsername === null)

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

  useScroll()

  return (
    <PageHead title={`@${username} - 자유담`} description="">
      <Navigation>
        <MinWidth>
          {user ? (
            <>
              <Sticky>
                <CoverImage
                  src={user.coverImageUrls?.[0] ?? '/images/cover.png'}
                  alt="user cover"
                  fill
                />
              </Sticky>

              <Relative>
                <Absolute>
                  <RelativeSquare>
                    <ProfileImage
                      src={user.imageUrls?.[0] ?? '/images/profile.jpeg'}
                      alt="user profile"
                      fill
                    />
                  </RelativeSquare>
                </Absolute>
              </Relative>

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

const MinWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
`

const Sticky = styled.div`
  position: sticky;
  top: -200px;
  z-index: 1;

  height: 250px;
`

const CoverImage = styled(Image)`
  object-fit: cover;

  inset: auto !important;
  bottom: 0 !important;
  min-height: 50px;

  animation: 200s linear calc(min(var(--scroll), 200) * -1s) 1 normal forwards paused shink-cover;

  @keyframes shink-cover {
    from {
      height: 250px;
    }
    to {
      height: 50px;
      filter: brightness(75%);
    }
  }
`

const Relative = styled(Relative_)`
  width: 100%;
  height: 75px;

  animation: 200s linear calc(min(var(--scroll), 200) * -1s) 1 normal forwards paused hide;

  @keyframes hide {
    0% {
      z-index: 1;
    }
    99% {
      z-index: 1;
    }
    100% {
      z-index: 0;
    }
  }
`

const Absolute = styled(Absolute_)`
  left: 50%;
  transform: translateX(-50%);
`

const RelativeSquare = styled(Relative_)`
  left: 50%;

  border: 2px solid #fff;
  border-radius: 50%;

  animation: 200s linear calc(var(--scroll) * -1s) 1 normal forwards paused shrink-profile;

  @keyframes shrink-profile {
    from {
      width: 150px;
      height: 150px;
      transform: translate(-50%, -50%);
    }
    to {
      width: 75px;
      height: 75px;
      transform: translate(-50%, 0);
    }
  }
`

const ProfileImage = styled(Image)`
  border: 2px solid #000;
  border-radius: 50%;
  object-fit: cover;
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
