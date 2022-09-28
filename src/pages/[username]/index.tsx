import Image from 'next/future/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import {
  Absolute as Absolute_,
  FlexBigGap as FlexBigGap_,
  FlexCenterSmallGap,
  FlexColumn as FlexColumn_,
  FlexSmallGap,
  GrayText,
  Relative as Relative_,
  TextOverflow as TextOverflow_,
} from '../../components/atoms/Flex'
import PageHead from '../../components/PageHead'
import { useLogoutMutation, useUserQuery } from '../../graphql/generated/types-and-hooks'
import { formatSex } from '../../graphql/utils'
import useNeedToLogin from '../../hooks/useNeedToLogin'
import useScroll from '../../hooks/useScroll'
import Navigation from '../../layouts/Navigation'
import ActiveIcon from '../../svgs/active.svg'
import CakeIcon from '../../svgs/cake.svg'
import GoogleLogo from '../../svgs/google-logo.svg'
import KakaoLogo from '../../svgs/kakao-logo.svg'
import MailIcon from '../../svgs/mail.svg'
import MapIcon from '../../svgs/map.svg'
import NaverLogo from '../../svgs/naver-logo.svg'
import SexIcon from '../../svgs/sex.svg'
import { getUsername } from '../../utils'
import {
  MOBILE_MIN_HEIGHT,
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
  TABLET_MIN_WIDTH,
  TABLET_MIN_WIDTH_1,
} from '../../utils/constants'
import { formatBirthday, formatSimpleDate } from '../../utils/date'
import { currentUser } from '../../utils/recoil'
import { GoogleButton, KakaoButton, NaverButton } from '../login'

export default function UserPage() {
  const router = useRouter()
  const pageUsername = getUsername(router)
  const [{ name: currentUsername }, setCurrentUser] = useRecoilState(currentUser)

  // 라우팅
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
    skip: !pageUsername || pageUsername === 'null' || pageUsername === 'undefined',
    variables: {
      name: pageUsername === currentUsername ? null : pageUsername,
    },
  })

  const user = data?.user
  const towns = user?.towns

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
            {logout.logoutTime && new Date(logout.logoutTime).toLocaleString()}
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
    <PageHead title={`@${pageUsername} - 자유담`} description="">
      <Navigation>
        <MinWidth>
          {user ? (
            <>
              <Sticky>
                <CoverRelative>
                  <CoverImage
                    src={user.coverImageUrls?.[0] ?? '/images/no-post.jpg'}
                    alt="user cover"
                    fill
                  />
                </CoverRelative>
                <AnimatedH3 as="h3">
                  {user.nickname}
                  <br />
                  <SmallText>이야기 {user.postCount ?? 0}개</SmallText>
                </AnimatedH3>
              </Sticky>

              <RelativeZIndex>
                <Absolute>
                  <RelativeTransform>
                    <ProfileImage
                      src={user.imageUrls?.[0] ?? '/images/shortcut-icon.webp'}
                      alt="user profile"
                      fill
                    />
                  </RelativeTransform>
                </Absolute>
              </RelativeZIndex>

              <Width>
                <H3 as="h3">{user.nickname}</H3>
                <H4 as="h4">@{pageUsername}</H4>
              </Width>

              <P>{user.bio}</P>

              {user.isPrivate ? (
                <div>비공개 계정입니다</div>
              ) : (
                <FlexColumn>
                  <FlexCenterSmallGap>
                    <SexIcon width="1.3rem" />
                    <GrayText>성별: {formatSex(user.sex)}</GrayText>
                  </FlexCenterSmallGap>
                  <FlexCenterSmallGap>
                    <CakeIcon width="1.3rem" />
                    <GrayText>
                      생일:{' '}
                      <GrayText>
                        {user.birthyear ?? 1900}년 {formatBirthday(user.birthday) ?? '0월 0일'}
                      </GrayText>
                    </GrayText>
                  </FlexCenterSmallGap>
                  <FlexCenterSmallGap>
                    <MapIcon width="1.3rem" />
                    {towns ? (
                      <GrayText>
                        서울특별시 동작구 {towns[0].count}회 인증
                        {towns[1] && (
                          <>
                            <br />
                            서울특별시 강동구 {towns[1].count}회 인증 {/* (최근 30일) */}
                          </>
                        )}
                      </GrayText>
                    ) : (
                      <GrayText>활동 지역 미인증</GrayText>
                    )}
                  </FlexCenterSmallGap>
                  <FlexCenterSmallGap>
                    <ActiveIcon width="1.3rem" />
                    <GrayText>최근 3일 이내 활동</GrayText>
                  </FlexCenterSmallGap>
                  <FlexCenterSmallGap>
                    <MailIcon width="1.3rem" />
                    <GrayText>
                      {' '}
                      {user.creationTime && formatSimpleDate(new Date(user.creationTime))} 가입
                    </GrayText>
                  </FlexCenterSmallGap>
                </FlexColumn>
              )}

              <FlexBigGap>
                <FlexSmallGap>
                  <h4>{user.followingCount}</h4> <GrayText>앞서니</GrayText>
                </FlexSmallGap>
                <FlexSmallGap>
                  <h4>{user.followerCount}</h4> <GrayText>뒤서니</GrayText>
                </FlexSmallGap>
              </FlexBigGap>

              <button disabled={logoutLoading} onClick={logout}>
                로그아웃
              </button>

              <button>따르기</button>
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

              <pre style={{ overflow: 'scroll', margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
            </>
          ) : (
            error && <div>해당 사용자는 존재하지 않아요</div>
          )}

          {userLoading && <div>사용자 정보를 불러오고 있습니다</div>}
        </MinWidth>
      </Navigation>
    </PageHead>
  )
}

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

const MinWidth = styled.main`
  @media (max-width: ${TABLET_MIN_WIDTH_1}) {
    width: 100vw;
  }

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
  }
`

const Sticky = styled.div`
  position: sticky;
  top: -200px;
  z-index: 2;

  height: calc(200px + 3rem);
  overflow: hidden;
`

const CoverRelative = styled(Relative_)`
  height: 100%;
  animation: 200s linear calc(min(var(--scroll), 200) * -1s) 1 normal forwards paused shink-cover;
  will-change: transform;

  @keyframes shink-cover {
    to {
      transform: translateY(50%);
      filter: brightness(60%);
    }
  }
`

const CoverImage = styled(Image)`
  object-fit: cover;
`

const RelativeZIndex = styled(Relative_)`
  width: 100%;
  height: 75px;
  z-index: 2;

  animation: 200s linear calc(min(var(--scroll), 200) * -1s) 1 normal forwards paused hide;

  @keyframes hide {
    99% {
      z-index: 2;
    }
    100% {
      z-index: 0;
    }
  }
`

const Absolute = styled(Absolute_)`
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
`

const RelativeTransform = styled(Relative_)`
  border: 2px solid #fff;
  border-radius: 50%;
  width: 150px;
  height: 150px;

  animation: 200s linear calc(var(--scroll) * -1s) 1 normal forwards paused shrink;
  will-change: transform;

  @keyframes shrink {
    to {
      transform: scale(0.5) translateY(50%);
    }
  }
`

const ProfileImage = styled(Image)`
  border: 2px solid #000;
  border-radius: 50%;
  object-fit: cover;
`

const Width = styled.div`
  position: relative;
  z-index: 1;

  padding: 1rem;
`

const H3 = styled(TextOverflow_)`
  font-weight: 500;
  text-align: center;
`

const H4 = styled(TextOverflow_)`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;
  text-align: center;
`

const AnimatedH3 = styled(H3)`
  position: absolute;
  bottom: 0;
  z-index: 3;
  transform: translateY(110%);

  color: #fff;
  line-height: 1.2rem;
  padding: 0 1rem;

  animation: 50s linear calc(max(0, calc(var(--scroll) - 290)) * -1s) 1 normal forwards paused show;
  will-change: transform;

  @keyframes show {
    to {
      transform: translateY(-10%);
    }
  }

  @media (max-width: ${TABLET_MIN_WIDTH_1}) {
    width: 100vw;
  }

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    width: ${MOBILE_MIN_HEIGHT};
  }
`

const SmallText = styled.span`
  font-size: 0.75rem;
`

const P = styled.p`
  max-width: ${MOBILE_MIN_HEIGHT};
  min-height: 1rem;
  margin: 1rem auto;
  padding: 0 1rem;
`

const FlexColumn = styled(FlexColumn_)`
  gap: 0.5rem;
  margin: 1rem;
`

const FlexBigGap = styled(FlexBigGap_)`
  margin: 1rem;
`
