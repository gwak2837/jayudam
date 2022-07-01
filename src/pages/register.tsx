import { useRouter } from 'next/router'
import React, { KeyboardEvent, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import ErrorIcon from 'src/svgs/error-icon.svg'
import LoadingSpinner from 'src/svgs/LoadingSpinner'
import { formatPhoneNumber } from 'src/utils'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

const H4 = styled.h4`
  margin: 1rem 0;
`

const FlexContainerGrow = styled.div`
  display: flex;
  flex-flow: column;
  padding: 2rem 0.6rem 0;

  > form > :last-child {
    flex-grow: 1;
  }
`

const GridContainerForm = styled.form`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 2.5rem;

  height: 100%;
  margin: 3rem 0 0;

  > div > button {
    margin-bottom: 2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Relative = styled.div`
  position: relative;

  > svg,
  div {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-40%);
  }

  > div {
    display: grid;
    align-items: center;
  }
`

const Input = styled.input<{ loading?: boolean; erred?: boolean }>`
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.loading ? p.theme.primary : p.erred ? p.theme.error : p.theme.primaryAchromatic)};
  border-radius: 0;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0;
  width: 100%;

  :focus {
    outline: none;
  }
`

const ErrorH5 = styled.h5`
  color: ${(p) => p.theme.error};
  margin-top: 5px;
`

const BigPrimaryText = styled.div`
  color: ${(p) => p.theme.error};
  font-size: 1.2rem;
  margin: 1rem;
  text-align: center;
`

const PrimaryText = styled.div`
  color: ${(p) => p.theme.error};
  margin-bottom: 3rem;
  text-align: center;
`

const DarkGreyText = styled.div`
  color: ${(p) => p.theme.lightText};
  font-weight: 600;
`

type RegisterFormValues = {
  nickname: string
  nicknameDuplicate: boolean
  phoneNumber: string
  phoneNumberConfirm: string
}

const description = ''

// http://localhost:3000/oauth/register?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMGYyNjAzNi02YWQyLTQ5YjItODBjMC0xZWJjMjcwNDY0NzAiLCJpYXQiOjE2Mzc2Mjk5MjMsImV4cCI6MTYzNzg4OTEyM30.HTcTVY41HUVsECAw6OLmhSO-7PcrpLImsX2k75jSFzc&phoneNumber=%2B82+10-9203-2837
export default function OAuthRegisterPage() {
  return (
    <PageHead title="회원 정보 입력 - 자유담" description={description}>
      ㅁㄴㅇㄹ
    </PageHead>
  )
}
