import { toCanvas } from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import AppleCheckbox from 'src/components/atoms/AppleCheckbox'
import PageHead from 'src/components/PageHead'
import {
  useGetCertJwtMutation,
  useGetMyCertAgreementQuery,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { viewportWidth } from 'src/utils'
import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

export default function QRCodePage() {
  useNeedToLogin()

  const { nickname } = useRecoilValue(currentUser)

  const qrCodeImageRef = useRef<HTMLCanvasElement>(null)

  // Form 상태 관리
  const { handleSubmit, setValue, watch } = useForm<CertAgreementForm>({
    defaultValues: {
      showBirthdate: false,
      showName: false,
      showSex: false,
      showSTDTestDetails: false,
      stdTestSince: undefined,
      showImmunizationDetails: false,
      immunizationSince: undefined,
      showSexualCrimeDetails: false,
      sexualCrimeSince: undefined,
    },
  })

  // 인증용 JWT 불러오기
  const [getCertJwtMutation, { loading: certJwtLoading }] = useGetCertJwtMutation({
    onCompleted: ({ updateCertAgreementAndGetCertJWT: certJwt }) => {
      toCanvas(qrCodeImageRef.current, certJwt, rendererOption)
    },
    onError: toastApolloError,
  })

  // 인증서 동의 항목 불러오기
  const { loading: certAgreementLoading } = useGetMyCertAgreementQuery({
    onCompleted: ({ myCertAgreement }) => {
      if (myCertAgreement) {
        const {
          showBirthdate,
          showName,
          showSex,
          showSTDTestDetails,
          stdTestSince,
          showImmunizationDetails,
          immunizationSince,
          showSexualCrimeDetails,
          sexualCrimeSince,
        } = myCertAgreement

        setValue('showBirthdate', showBirthdate)
        setValue('showName', showName)
        setValue('showSex', showSex)
        setValue('showSTDTestDetails', showSTDTestDetails)
        setValue('stdTestSince', stdTestSince)
        setValue('showImmunizationDetails', showImmunizationDetails)
        setValue('immunizationSince', immunizationSince)
        setValue('showSexualCrimeDetails', showSexualCrimeDetails)
        setValue('sexualCrimeSince', sexualCrimeSince)

        getCertJwtMutation({
          variables: {
            input: {
              showBirthdate,
              showName,
              showSex,
              showSTDTestDetails,
              stdTestSince,
              showImmunizationDetails,
              immunizationSince,
              showSexualCrimeDetails,
              sexualCrimeSince,
            },
          },
        })
      }
    },
    onError: toastApolloError,
    skip: !nickname,
  })

  function getCertJwt(input: CertAgreementForm) {
    const {
      showBirthdate,
      showName,
      showSex,
      showSTDTestDetails,
      stdTestSince,
      showImmunizationDetails,
      immunizationSince,
      showSexualCrimeDetails,
      sexualCrimeSince,
    } = input

    getCertJwtMutation({
      variables: {
        input: {
          showBirthdate,
          showName,
          showSex,
          showSTDTestDetails,
          stdTestSince,
          showImmunizationDetails,
          immunizationSince,
          showSexualCrimeDetails,
          sexualCrimeSince,
        },
      },
    })
  }

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <canvas ref={qrCodeImageRef} />

          <form onSubmit={handleSubmit(getCertJwt)}>
            <ul>
              <div>생년월일</div>
              <AppleCheckbox
                checked={watch('showBirthdate')}
                onChange={(e) => setValue('showBirthdate', e.target.checked)}
              />

              <div>이름</div>
              <AppleCheckbox
                checked={watch('showName')}
                onChange={(e) => setValue('showName', e.target.checked)}
              />

              <div>성별</div>
              <AppleCheckbox
                checked={watch('showSex')}
                onChange={(e) => setValue('showSex', e.target.checked)}
              />

              <div>성병검사</div>
              <AppleCheckbox
                checked={watch('showSTDTestDetails')}
                onChange={(e) => setValue('showSTDTestDetails', e.target.checked)}
              />

              <div>성병예방접종</div>
              <AppleCheckbox
                checked={watch('showImmunizationDetails')}
                onChange={(e) => setValue('showImmunizationDetails', e.target.checked)}
              />

              <div>(성)범죄</div>
              <AppleCheckbox
                checked={watch('showSexualCrimeDetails')}
                onChange={(e) => setValue('showSexualCrimeDetails', e.target.checked)}
              />
            </ul>

            <button disabled={!nickname} type="submit">
              QR Code 재생성하기
            </button>
          </form>
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

type CertAgreementForm = {
  showBirthdate?: boolean
  showName?: boolean
  showSex?: boolean
  showSTDTestDetails?: boolean
  stdTestSince?: Date
  showImmunizationDetails?: boolean
  immunizationSince?: Date
  showSexualCrimeDetails?: boolean
  sexualCrimeSince?: Date
}

const rendererOption = { width: Math.max(300, Math.min(viewportWidth, 400)) }
