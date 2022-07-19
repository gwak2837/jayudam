import { toCanvas } from 'qrcode'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import AppleCheckbox from 'src/components/atoms/AppleCheckbox'
import PageHead from 'src/components/PageHead'
import {
  useGetMyCertAgreementQuery,
  useUpdateCertAgreementMutation,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { viewportWidth } from 'src/utils'
import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { SubmitButton } from '../register'

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
  const [updateCertAgreementMutation, { loading: updateCertAgreementLoading }] =
    useUpdateCertAgreementMutation({
      onCompleted: ({ updateCertAgreement: certJwt }) => {
        toCanvas(qrCodeImageRef.current, certJwt, rendererOption)
      },
      onError: toastApolloError,
      refetchQueries: ['GetMyCertAgreement'],
    })

  function updateCertAgreement(input: CertAgreementForm) {
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

    updateCertAgreementMutation({
      variables: {
        input: {
          ...(showBirthdate && { showBirthdate }),
          ...(showName && { showName }),
          ...(showSex && { showSex }),
          ...(showSTDTestDetails && { showSTDTestDetails }),
          ...(stdTestSince && { stdTestSince }),
          ...(showImmunizationDetails && { showImmunizationDetails }),
          ...(immunizationSince && { immunizationSince }),
          ...(showSexualCrimeDetails && { showSexualCrimeDetails }),
          ...(sexualCrimeSince && { sexualCrimeSince }),
        },
      },
    })
  }

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

        updateCertAgreementMutation({
          variables: {
            input: {
              ...(showBirthdate && { showBirthdate }),
              ...(showName && { showName }),
              ...(showSex && { showSex }),
              ...(showSTDTestDetails && { showSTDTestDetails }),
              ...(stdTestSince && { stdTestSince }),
              ...(showImmunizationDetails && { showImmunizationDetails }),
              ...(immunizationSince && { immunizationSince }),
              ...(showSexualCrimeDetails && { showSexualCrimeDetails }),
              ...(sexualCrimeSince && { sexualCrimeSince }),
            },
          },
        })
      }
    },
    onError: toastApolloError,
    skip: !nickname,
  })

  const isInputDisabled = !nickname || certAgreementLoading || updateCertAgreementLoading

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <canvas ref={qrCodeImageRef} width={300} height={qrcodeWidth} />

          <form onSubmit={handleSubmit(updateCertAgreement)}>
            <Ul>
              <li>
                <div>생년월일</div>
                <AppleCheckbox
                  checked={watch('showBirthdate')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showBirthdate', e.target.checked)}
                />
              </li>
              <li>
                <div>이름</div>
                <AppleCheckbox
                  checked={watch('showName')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showName', e.target.checked)}
                />
              </li>
              <li>
                <div>성별</div>
                <AppleCheckbox
                  checked={watch('showSex')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showSex', e.target.checked)}
                />
              </li>
              <li>
                <div>성병검사</div>
                <AppleCheckbox
                  checked={watch('showSTDTestDetails')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showSTDTestDetails', e.target.checked)}
                />
              </li>
              <li>
                <div>성병예방접종</div>
                <AppleCheckbox
                  checked={watch('showImmunizationDetails')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showImmunizationDetails', e.target.checked)}
                />
              </li>
              <li>
                <div>(성)범죄</div>
                <AppleCheckbox
                  checked={watch('showSexualCrimeDetails')}
                  disabled={isInputDisabled}
                  onChange={(e) => setValue('showSexualCrimeDetails', e.target.checked)}
                />
              </li>
              <SubmitButton disabled={isInputDisabled} type="submit">
                QR Code 재생성하기
              </SubmitButton>
            </Ul>
          </form>
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
  padding: 2rem 0;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Ul = styled.ul`
  display: grid;
  gap: 2rem;
  padding: 1rem;
  min-width: ${MOBILE_MIN_WIDTH};

  > li {
    display: flex;
    justify-content: space-between;
  }
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

const qrcodeWidth = Math.max(300, Math.min(viewportWidth, 400))
const rendererOption = { width: qrcodeWidth }
