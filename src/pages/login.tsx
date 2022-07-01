import Image from 'next/image'
import React, { useState } from 'react'
import PageHead from 'src/components/PageHead'
import { SquareFrame } from 'src/styles'
import styled from 'styled-components'

import CheckBoxIcon from '../svgs/CheckBoxIcon'
import KakaoIcon from '../svgs/kakao-icon.svg'

export default function LoginPage() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <PageHead title="로그인 - 자유담" description={description}>
      <FlexGrowPadding>
        <GridContainerTemplate>
          <SquareFrame>
            <Image src="/images/login.png" alt="login" layout="fill" objectFit="cover" />
          </SquareFrame>
        </GridContainerTemplate>

        <Text>
          자유담은 <br />
          <PrimaryColorText>성인</PrimaryColorText> 에게만 오픈된 공간이에요.
        </Text>

        <H5>비바톤 로그인으로 성인임을 확인해 주세요</H5>

        <BBathonButton onClick={goToBBathonLoginPage}>
          <KakaoIcon />
          비바톤으로 3초 만에 인증하기
        </BBathonButton>

        <H5>이미 인증했다면 소셜 로그인을 진행해주세요</H5>
        <AutoLogin htmlFor="auto-login">
          <LoginCheckBox
            id="auto-login"
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                sessionStorage.setItem('autoLogin', 'true')
                setIsChecked(true)
              } else {
                sessionStorage.removeItem('autoLogin')
                setIsChecked(false)
              }
            }}
          />
          <CheckBoxIcon isChecked={isChecked} />
          로그인 상태를 유지할게요
        </AutoLogin>

        <KakaoButton onClick={goToKakaoLoginPage}>
          <KakaoIcon />
          카카오톡으로 3초 만에 로그인하기
        </KakaoButton>

        <KakaoButton onClick={goToNaverLoginPage}>
          <KakaoIcon />
          네이버로 3초 만에 로그인하기
        </KakaoButton>

        <KakaoButton onClick={goToKakaoLoginPage}>
          <KakaoIcon />
          구글로 3초 만에 로그인하기
        </KakaoButton>

        <KakaoButton onClick={goToKakaoLoginPage}>
          <KakaoIcon />
          페이스북으로 3초 만에 로그인하기
        </KakaoButton>
      </FlexGrowPadding>
    </PageHead>
  )
}

const H5 = styled.h5`
  color: #676767;
  padding: 1.5rem 0;
  text-align: center;
`

const GridContainerTemplate = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 3.5fr 1fr;

  > div {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width: 100%; // for safari
    cursor: pointer;
  }
`

const AutoLogin = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  gap: 5px;
  cursor: pointer;
`

const LoginCheckBox = styled.input`
  display: none;
`

const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  background: #fee500;
  padding: 1rem;
  margin: 0 0 2rem;
  transition: background 0.3s ease-in;
  border-radius: 10px;

  :hover {
    background: #fee500c0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
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
  margin: 0 0 2rem;
  transition: background 0.3s ease-in;
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

export const FlexContainerGrow = styled.div`
  display: flex;
  flex-flow: column;

  > :last-child {
    flex-grow: 1;
  }
`

const FlexGrowPadding = styled(FlexContainerGrow)`
  padding: 2rem 1rem 0;
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
`

const description = '자유담에 로그인하세요'

function goToKakaoLoginPage() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/kakao`
  )
}

function goToBBathonLoginPage() {
  window.location.replace(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/kakao`
  )
}

function goToNaverLoginPage() {
  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=FPQoCRnHgbAWgjWYtlLb&redirect_uri=http://localhost:4000/oauth/naver&state=123`
}
