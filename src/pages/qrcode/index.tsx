import { toCanvas } from 'qrcode'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import AppleCheckbox from 'src/components/atoms/AppleCheckbox'
import SingleSelectionButtons from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import {
  useMyCertAgreementQuery,
  useUpdateCertAgreementMutation,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getViewportWidth } from 'src/utils'
import { MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { getNMonthBefore, getNYearBefore } from 'src/utils/date'
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
      stdTestSince: null,
      showImmunizationDetails: false,
      immunizationSince: null,
      showSexualCrimeDetails: false,
      sexualCrimeSince: null,
    },
  })

  const [stdTestSince, setSTDTestSince] = useState('')
  const [immunizationSince, setImmunizationSince] = useState('')
  const [sexualCrimeSince, setSexualCrimeSince] = useState('')

  const [selectedSTDTestSince, setSelectedSTDTestSince] = useState(0)
  const [selectedImmunizationSince, setSelectedImmunizationSince] = useState(0)
  const [selectedSexualCrimeSince, setSelectedSexualCrimeSince] = useState(0)

  const watchShowSTDTestDetails = watch('showSTDTestDetails')
  const watchShowImmunizationDetails = watch('showImmunizationDetails')
  const watchShowSexualCrimeDetails = watch('showSexualCrimeDetails')

  // 인증용 JWT 불러오기
  const [updateCertAgreementMutation, { loading: updateCertAgreementLoading }] =
    useUpdateCertAgreementMutation({
      onCompleted: ({ updateCertAgreement: certJwt }) => {
        toCanvas(qrCodeImageRef.current, certJwt, rendererOption)
      },
      onError: toastApolloError,
      refetchQueries: ['MyCertAgreement'],
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
          ...(showSTDTestDetails && stdTestSince && { stdTestSince }),
          ...(showImmunizationDetails && { showImmunizationDetails }),
          ...(showImmunizationDetails && immunizationSince && { immunizationSince }),
          ...(showSexualCrimeDetails && { showSexualCrimeDetails }),
          ...(showSexualCrimeDetails && sexualCrimeSince && { sexualCrimeSince }),
        },
      },
    })
  }

  // 인증서 동의 항목 불러오기
  const { loading: certAgreementLoading } = useMyCertAgreementQuery({
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

        const a = selectionSince.indexOf(stdTestSince)
        if (a === -1) setSTDTestSince(stdTestSince)
        setSelectedSTDTestSince(a)

        const b = selectionSince.indexOf(immunizationSince)
        if (b === -1) setImmunizationSince(immunizationSince)
        setSelectedImmunizationSince(b)

        const c = selectionSince.indexOf(sexualCrimeSince)
        if (c === -1) setSexualCrimeSince(sexualCrimeSince)
        setSelectedSexualCrimeSince(b)

        setSelectedSexualCrimeSince(selectionSince.indexOf(sexualCrimeSince))

        updateCertAgreementMutation({
          variables: {
            input: {
              ...(showBirthdate && { showBirthdate }),
              ...(showName && { showName }),
              ...(showSex && { showSex }),
              ...(showSTDTestDetails && { showSTDTestDetails }),
              ...(showSTDTestDetails && stdTestSince && { stdTestSince }),
              ...(showImmunizationDetails && { showImmunizationDetails }),
              ...(showImmunizationDetails && immunizationSince && { immunizationSince }),
              ...(showSexualCrimeDetails && { showSexualCrimeDetails }),
              ...(showSexualCrimeDetails && sexualCrimeSince && { sexualCrimeSince }),
            },
          },
        })
      }
    },
    onError: toastApolloError,
    skip: !nickname,
  })

  const disableInput = certAgreementLoading || updateCertAgreementLoading

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <canvas ref={qrCodeImageRef} width={300} height={qrcodeWidth} />

          <form onSubmit={handleSubmit(updateCertAgreement)}>
            <Ul>
              <Sticky>
                <SubmitButton disabled={disableInput} type="submit">
                  QR Code 재생성하기
                </SubmitButton>
              </Sticky>

              <h3>정보 제공 동의 항목</h3>
              <li>
                <FlexBetween>
                  <div>생년월일</div>
                  <AppleCheckbox
                    checked={watch('showBirthdate')}
                    disabled={disableInput}
                    onChange={(e) => setValue('showBirthdate', e.target.checked)}
                  />
                </FlexBetween>
              </li>
              <li>
                <FlexBetween>
                  <div>이름</div>
                  <AppleCheckbox
                    checked={watch('showName')}
                    disabled={disableInput}
                    onChange={(e) => setValue('showName', e.target.checked)}
                  />
                </FlexBetween>
              </li>
              <li>
                <FlexBetween>
                  <div>성별</div>
                  <AppleCheckbox
                    checked={watch('showSex')}
                    disabled={disableInput}
                    onChange={(e) => setValue('showSex', e.target.checked)}
                  />
                </FlexBetween>
              </li>
              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성병검사</div>
                    <AppleCheckbox
                      checked={watchShowSTDTestDetails}
                      disabled={disableInput}
                      onChange={(e) => setValue('showSTDTestDetails', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchShowSTDTestDetails}
                    onChange={(e, i) => {
                      setValue('stdTestSince', e)
                      setSTDTestSince('')
                      setSelectedSTDTestSince(i)
                    }}
                    selectedIndex={selectedSTDTestSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SSingleSelectionButtons>
                  <FlexBetweenGray disabled={!watchShowSTDTestDetails}>
                    <label>직접 선택</label>
                    <div>
                      <input
                        disabled={!watchShowSTDTestDetails}
                        onChange={(e) => {
                          setValue('stdTestSince', e.target.value)
                          setSTDTestSince(e.target.value)
                          setSelectedSTDTestSince(-1)
                        }}
                        type="date"
                        value={stdTestSince}
                      />
                      <span> 부터</span>
                    </div>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>
              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성병예방접종</div>
                    <AppleCheckbox
                      checked={watchShowImmunizationDetails}
                      disabled={disableInput}
                      onChange={(e) => setValue('showImmunizationDetails', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchShowImmunizationDetails}
                    onChange={(e, i) => {
                      setValue('immunizationSince', e)
                      setImmunizationSince('')
                      setSelectedImmunizationSince(i)
                    }}
                    selectedIndex={selectedImmunizationSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SSingleSelectionButtons>
                  <FlexBetweenGray disabled={!watchShowImmunizationDetails}>
                    <label>직접 선택</label>
                    <div>
                      <input
                        disabled={!watchShowImmunizationDetails}
                        onChange={(e) => {
                          setValue('immunizationSince', e.target.value)
                          setImmunizationSince(e.target.value)
                          setSelectedImmunizationSince(-1)
                        }}
                        type="date"
                        value={immunizationSince}
                      />
                      <span> 부터</span>
                    </div>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>
              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성범죄</div>
                    <AppleCheckbox
                      checked={watchShowSexualCrimeDetails}
                      disabled={disableInput}
                      onChange={(e) => setValue('showSexualCrimeDetails', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchShowSexualCrimeDetails}
                    onChange={(e, i) => {
                      setValue('sexualCrimeSince', e)
                      setSexualCrimeSince('')
                      setSelectedSexualCrimeSince(i)
                    }}
                    selectedIndex={selectedSexualCrimeSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SSingleSelectionButtons>
                  <FlexBetweenGray disabled={!watchShowSexualCrimeDetails}>
                    <label>직접 선택</label>
                    <div>
                      <input
                        disabled={!watchShowSexualCrimeDetails}
                        onChange={(e) => {
                          setValue('sexualCrimeSince', e.target.value)
                          setSexualCrimeSince(e.target.value)
                          setSelectedSexualCrimeSince(-1)
                        }}
                        type="date"
                        value={sexualCrimeSince}
                      />
                      <span> 부터</span>
                    </div>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>
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
  position: relative;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FlexBetweenGray = styled(FlexBetween)<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primaryTextAchromatic)};
`

const SSingleSelectionButtons = styled(SingleSelectionButtons)`
  padding: 0.5rem;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 1rem;
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 4;
  padding: 1rem 0;
`

type CertAgreementForm = {
  showBirthdate: boolean
  showName: boolean
  showSex: boolean
  showSTDTestDetails: boolean
  stdTestSince: string | null
  showImmunizationDetails: boolean
  immunizationSince: string | null
  showSexualCrimeDetails: boolean
  sexualCrimeSince: string | null
}

const qrcodeWidth = Math.max(300, Math.min(getViewportWidth(), 350))
const rendererOption = { width: qrcodeWidth }

const selectionSince = [null, getNMonthBefore(1), getNMonthBefore(6), getNYearBefore(1)]
