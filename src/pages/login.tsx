import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import PageHead from 'src/components/PageHead'
import {
  MOBILE_HORIZONTAL_MIN_WIDTH,
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_BBATON_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
  TABLET_MIN_WIDTH,
} from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import CheckBoxIcon from '../svgs/CheckBoxIcon'
import GoogleLogo from '../svgs/google-logo.svg'
import KakaoLogo from '../svgs/kakao-logo.svg'

export default function LoginPage() {
  const { nickname } = useRecoilValue(currentUser)
  const router = useRouter()

  useEffect(() => {
    if (nickname) router.replace('/')
  }, [nickname, router])

  return (
    <PageHead title="로그인 - 자유담" description="자유담에 로그인하세요">
      <FlexCenter>
        <GridPadding>
          <Link href="/">
            <MarginImage src="/images/logo.webp" alt="jayudam logo" />
          </Link>

          <Text>
            자유담은 <br />
            <PrimaryColorText>성인</PrimaryColorText> 에게만 오픈된 공간이에요.
          </Text>

          <AutoLoginCheckbox />

          <H5>비바톤 계정으로 익명 성인인증을 해주세요</H5>

          <BBathonButton onClick={goToBBathonLoginPage}>비바톤 익명 로그인</BBathonButton>

          <H5>이미 SNS 계정을 연동했다면</H5>

          <KakaoButton onClick={goToKakaoLoginPage}>
            <KakaoLogo />
            카카오톡 로그인
          </KakaoButton>

          <NaverButton onClick={goToNaverLoginPage}>네이버 로그인</NaverButton>

          <GoogleButton onClick={goToGoogleLoginPage}>
            <GoogleLogo />
            Google 로그인
          </GoogleButton>
        </GridPadding>
      </FlexCenter>
    </PageHead>
  )
}

function AutoLoginCheckbox() {
  const [isChecked, setIsChecked] = useState(false)

  function setAutoLogin(e: any) {
    if (e.target.checked) {
      sessionStorage.setItem('autoLogin', 'true')
      setIsChecked(true)
    } else {
      sessionStorage.removeItem('autoLogin')
      setIsChecked(false)
    }
  }

  return (
    <AutoLogin htmlFor="auto-login">
      <LoginCheckBox id="auto-login" type="checkbox" onChange={setAutoLogin} />
      <CheckBoxIcon isChecked={isChecked} />
      로그인 상태를 유지할게요
    </AutoLogin>
  )
}

const FlexCenter = styled.div`
  @media (min-width: ${MOBILE_HORIZONTAL_MIN_WIDTH}) {
    display: flex;
    justify-content: center;
  }
`

const MarginImage = styled(Image)`
  padding: 2rem 1rem;
  min-width: 200px;
  width: 50%;
  margin: auto;
`

const H5 = styled.h5`
  color: #676767;
  padding: 1.5rem 0;
  text-align: center;
`

const AutoLogin = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
`

const LoginCheckBox = styled.input`
  display: none;
`

// https://developers.kakao.com/docs/latest/ko/reference/design-guide
const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  background: #fee500;
  padding: 1rem;
  transition: background 0.3s ease-in;
  border-radius: 10px;

  :hover {
    background: #ecd400;
  }
`

// https://developers.google.com/identity/branding-guidelines
const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  background: #fff;
  border: 1px solid #ccc;
  padding: 1rem;
  transition: background 0.2s ease-in;
  border-radius: 10px;

  :hover {
    background: #eee;
  }
`

const BBathonButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  background: #0071bc;
  color: #fff;
  padding: 1rem;
  transition: background 0.2s ease-in;
  border-radius: 10px;

  :hover {
    background: #005f9f;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`

// https://developers.naver.com/docs/login/bi/bi.md
const NaverButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  background: #03c75a;
  color: #fff;
  padding: 1rem;
  transition: background 0.2s ease-in;
  border-radius: 10px;

  :hover {
    background: #03b152;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`

const GridPadding = styled.div`
  display: grid;
  padding: 2rem 1rem;
  gap: 1rem;

  @media (min-width: ${MOBILE_HORIZONTAL_MIN_WIDTH}) {
    min-width: ${MOBILE_HORIZONTAL_MIN_WIDTH};
  }

  > a {
    text-align: center;
  }
`

const PrimaryColorText = styled.span`
  color: ${(p) => p.theme.primaryText};
  font-size: 1.3rem;
  font-weight: 500;
`

const Text = styled.div`
  background: ${(p) => p.theme.background};
  border-radius: 10px;
  line-height: 2rem;
  padding: 1.5rem;
  text-align: center;
`

// state={%22personalDataStoringPeriod%22:3}
function goToBBathonLoginPage() {
  window.location.replace(
    `https://bauth.bbaton.com/oauth/authorize?client_id=${NEXT_PUBLIC_BBATON_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/oauth/bbaton&response_type=code&scope=read_profile`
  )
}

function goToKakaoLoginPage() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/oauth/kakao`
  )
}

function goToNaverLoginPage() {
  window.location.replace(
    `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/oauth/naver&state=state`
  )
}

function goToGoogleLoginPage() {
  window.location.replace(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${NEXT_PUBLIC_BACKEND_URL}/oauth/google&response_type=code&scope=openid+profile`
  )
}
