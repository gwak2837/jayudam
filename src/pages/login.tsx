import Image from 'next/future/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PageHead from 'src/components/PageHead'
import {
  NEXT_PUBLIC_BACKEND_URL,
  NEXT_PUBLIC_BBATON_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_KAKAO_REST_API_KEY,
  NEXT_PUBLIC_NAVER_CLIENT_ID,
} from 'src/utils/constants'
import styled from 'styled-components'

import CheckBoxIcon from '../svgs/CheckBoxIcon'
import GoogleLogo from '../svgs/google-logo.svg'
import KakaoLogo from '../svgs/kakao-logo.svg'

export default function LoginPage() {
  return (
    <PageHead title="로그인 - 자유담" description="자유담에 로그인하세요">
      <FlexCenterCenter>
        <Link href="/">
          <MarginImage src="/images/logo.webp" alt="jayudam logo" />
        </Link>
      </FlexCenterCenter>

      <FlexGrowPadding>
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
      </FlexGrowPadding>
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

const MarginImage = styled(Image)`
  margin: 2rem 1rem;
`

const FlexCenterCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
    background: #fee500c0;
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
    background: #ffffffc0;
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
    background: #0071bcc0;
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
    background: #03c75ac0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`

export const FlexContainerGrow = styled.div`
  display: flex;
  flex-flow: column;

  > :last-child {
    flex-grow: 1;
  }
`

const FlexGrowPadding = styled(FlexContainerGrow)`
  padding: 2rem 1rem;
  gap: 1rem;
`

const PrimaryColorText = styled.span`
  color: ${(p) => p.theme.primary};
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
