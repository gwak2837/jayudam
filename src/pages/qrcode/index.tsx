import { toCanvas } from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTimer } from 'react-timer-hook'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import AppleCheckbox from 'src/components/atoms/AppleCheckbox'
import { FlexCenterCenter } from 'src/components/atoms/Flex'
import SingleSelectionButtons_ from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import {
  CertAgreementInput,
  useCertJwtMutation,
  useMyCertAgreementQuery,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import TimerIcon from 'src/svgs/timer.svg'
import { getViewportWidth, parseJWT } from 'src/utils'
import { MOBILE_MIN_WIDTH } from 'src/utils/constants'
import {
  formatISOLocalDate,
  getNMonthBefore,
  getNYearBefore,
  getTimeFromDateString,
} from 'src/utils/date'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { SubmitButton } from '../register'

export default function QRCodePage() {
  useNeedToLogin()

  const { name } = useRecoilValue(currentUser)

  // QR Code 이미지
  const qrCodeImageRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    toCanvas(qrCodeImageRef.current, 'jayudam', {
      color: { dark: '#888888ff', light: '#ffffffff' },
      width: qrcodeWidth,
    })
  }, [])

  // 인증서 동의 항목 상태 관리
  const {
    formState: { isDirty },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<CertAgreementForm>({
    defaultValues: {
      showBirthdate: false,
      showLegalName: false,
      showSex: false,
      showSTDTest: false,
      stdTestSince: null,
      showImmunization: false,
      immunizationSince: null,
      showSexualCrime: false,
      sexualCrimeSince: null,
    },
  })

  const watchshowSTDTest = watch('showSTDTest')
  const watchshowImmunization = watch('showImmunization')
  const watchshowSexualCrime = watch('showSexualCrime')

  const [stdTestSince, setSTDTestSince] = useState<number | null>(null)
  const [immunizationSince, setImmunizationSince] = useState<number | null>(null)
  const [sexualCrimeSince, setSexualCrimeSince] = useState<number | null>(null)

  const [selectedSTDTestSince, setSelectedSTDTestSince] = useState(0)
  const [selectedImmunizationSince, setSelectedImmunizationSince] = useState(0)
  const [selectedSexualCrimeSince, setSelectedSexualCrimeSince] = useState(0)

  // JWT 불러오기
  const [certJWTMutation, { data, loading: certJWTLoading }] = useCertJwtMutation({
    onCompleted: ({ certJWT }) => {
      toCanvas(qrCodeImageRef.current, certJWT, { width: qrcodeWidth })
      restart(new Date(parseJWT(certJWT).exp * 1000))
    },
    onError: toastApolloError,
  })

  async function getCertJWT(form: CertAgreementForm) {
    const {
      showBirthdate,
      showLegalName,
      showSex,
      showSTDTest,
      stdTestSince,
      showImmunization,
      immunizationSince,
      showSexualCrime,
      sexualCrimeSince,
    } = form

    const input = {
      ...(showBirthdate && { showBirthdate }),
      ...(showLegalName && { showLegalName }),
      ...(showSex && { showSex }),
      ...(showSTDTest && { showSTDTest }),
      ...(showSTDTest && stdTestSince && { stdTestSince: new Date(stdTestSince) }),
      ...(showImmunization && { showImmunization }),
      ...(showImmunization &&
        immunizationSince && { immunizationSince: new Date(immunizationSince) }),
      ...(showSexualCrime && { showSexualCrime }),
      ...(showSexualCrime && sexualCrimeSince && { sexualCrimeSince: new Date(sexualCrimeSince) }),
    }

    setPreviousInput(input)
    await certJWTMutation({ variables: { input } })

    reset(form)
  }

  // QR Code 새로고침
  const autoRefreshRef = useRef<HTMLInputElement>(null)
  const [previousInput, setPreviousInput] = useState<CertAgreementInput>()

  const { restart, seconds } = useTimer({
    expiryTimestamp: new Date(Date.now() + 15_000),
    onExpire: () => {
      if (autoRefreshRef.current?.checked && previousInput) {
        certJWTMutation({ variables: { input: previousInput } })
      } else {
        toCanvas(qrCodeImageRef.current, data?.certJWT ?? 'jayudam', {
          color: { dark: '#888888ff', light: '#ffffffff' },
          width: qrcodeWidth,
        })
      }
    },
  })

  function refreshQRCode() {
    if (autoRefreshRef.current?.checked && previousInput) {
      certJWTMutation({ variables: { input: previousInput } })
    }
  }

  // 이전 인증서 동의 항목 불러오기
  const { loading: certAgreementLoading } = useMyCertAgreementQuery({
    onCompleted: ({ myCertAgreement }) => {
      if (myCertAgreement) {
        const {
          showBirthdate,
          showLegalName,
          showSex,
          showSTDTest,
          stdTestSince, // string | null
          showImmunization,
          immunizationSince, // string | null
          showSexualCrime,
          sexualCrimeSince, // string | null
        } = myCertAgreement

        const stdTestSinceTime = getTimeFromDateString(stdTestSince)
        const immunizationSinceTime = getTimeFromDateString(immunizationSince)
        const sexualCrimeSinceTime = getTimeFromDateString(sexualCrimeSince)

        const index1 = selectionSince.indexOf(stdTestSinceTime)
        const index2 = selectionSince.indexOf(immunizationSinceTime)
        const index3 = selectionSince.indexOf(sexualCrimeSinceTime)

        setSelectedSTDTestSince(index1)
        setSelectedImmunizationSince(index2)
        setSelectedSexualCrimeSince(index3)

        if (index1 === -1) setSTDTestSince(stdTestSinceTime)
        if (index2 === -1) setImmunizationSince(immunizationSinceTime)
        if (index3 === -1) setSexualCrimeSince(sexualCrimeSinceTime)

        reset({
          showBirthdate,
          showLegalName,
          showSex,
          showSTDTest,
          stdTestSince: stdTestSinceTime,
          showImmunization,
          immunizationSince: immunizationSinceTime,
          showSexualCrime,
          sexualCrimeSince: sexualCrimeSinceTime,
        })

        const input = {
          ...(showBirthdate && { showBirthdate }),
          ...(showLegalName && { showLegalName }),
          ...(showSex && { showSex }),
          ...(showSTDTest && { showSTDTest }),
          ...(showSTDTest && stdTestSince && { stdTestSince }),
          ...(showImmunization && { showImmunization }),
          ...(showImmunization && immunizationSince && { immunizationSince }),
          ...(showSexualCrime && { showSexualCrime }),
          ...(showSexualCrime && sexualCrimeSince && { sexualCrimeSince }),
        }

        setPreviousInput(input)
        certJWTMutation({ variables: { input } })
      }
    },
    onError: toastApolloError,
    skip: !name,
  })

  const isLoading = certAgreementLoading || certJWTLoading

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <FlexMain>
          <div>
            <canvas ref={qrCodeImageRef} width={300} height={300} />

            <Width>
              <FlexCenterCenterGap>
                <TimerIcon width="1.5rem" />
                <h4>남은시간</h4>
                <Red>{String(seconds).padStart(2, '0')}초</Red>
              </FlexCenterCenterGap>

              <FlexBetweenGap>
                <div>자동 새로고침</div>
                <AppleCheckbox
                  defaultChecked={true}
                  ref={autoRefreshRef}
                  onChange={(e) => e.target.checked && refreshQRCode()}
                />
              </FlexBetweenGap>
            </Width>
          </div>

          <form onSubmit={handleSubmit(getCertJWT)}>
            <Ul>
              <Sticky>
                <SubmitButton disabled={isLoading || !name || !isDirty} type="submit">
                  QR Code 재생성하기
                </SubmitButton>
              </Sticky>

              <h3>정보 제공 동의 항목</h3>

              <li>
                <FlexBetween>
                  <div>생년월일</div>
                  <AppleCheckbox disabled={isLoading} {...register('showBirthdate')} />
                </FlexBetween>
              </li>

              <li>
                <FlexBetween>
                  <div>이름</div>
                  <AppleCheckbox {...register('showLegalName')} />
                </FlexBetween>
              </li>

              <li>
                <FlexBetween>
                  <div>성별</div>
                  <AppleCheckbox {...register('showSex')} />
                </FlexBetween>
              </li>

              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성병검사</div>
                    <AppleCheckbox {...register('showSTDTest')} />
                  </FlexBetween>

                  <SingleSelectionButtons
                    disabled={!watchshowSTDTest}
                    onChange={(newValue, i) => {
                      setValue('stdTestSince', newValue, { shouldDirty: true })
                      setSTDTestSince(null)
                      setSelectedSTDTestSince(i)
                    }}
                    selectedIndex={selectedSTDTestSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SingleSelectionButtons>

                  <FlexBetweenGray disabled={!watchshowSTDTest}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowSTDTest}
                        onChange={(e) => {
                          const selectedTime = new Date(e.target.value).getTime()
                          if (selectedTime < Date.now()) {
                            setValue('stdTestSince', selectedTime, { shouldDirty: true })
                            setSTDTestSince(selectedTime)
                            setSelectedSTDTestSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={formatISOLocalDate(stdTestSince)}
                      />
                      <span> 부터</span>
                    </FlexCenter>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>

              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성병예방접종</div>
                    <AppleCheckbox {...register('showImmunization')} />
                  </FlexBetween>

                  <SingleSelectionButtons
                    disabled={!watchshowImmunization}
                    onChange={(newValue, i) => {
                      setValue('immunizationSince', newValue, { shouldDirty: true })
                      setImmunizationSince(null)
                      setSelectedImmunizationSince(i)
                    }}
                    selectedIndex={selectedImmunizationSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SingleSelectionButtons>

                  <FlexBetweenGray disabled={!watchshowImmunization}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowImmunization}
                        onChange={(e) => {
                          const selectedTime = new Date(e.target.value).getTime()
                          if (selectedTime < Date.now()) {
                            setValue('immunizationSince', selectedTime, { shouldDirty: true })
                            setImmunizationSince(selectedTime)
                            setSelectedImmunizationSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={formatISOLocalDate(immunizationSince)}
                      />
                      <span> 부터</span>
                    </FlexCenter>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>

              <li>
                <GridSmallGap>
                  <FlexBetween>
                    <div>성범죄</div>
                    <AppleCheckbox {...register('showSexualCrime')} />
                  </FlexBetween>

                  <SingleSelectionButtons
                    disabled={!watchshowSexualCrime}
                    onChange={(newValue, i) => {
                      setValue('sexualCrimeSince', newValue, { shouldDirty: true })
                      setSexualCrimeSince(null)
                      setSelectedSexualCrimeSince(i)
                    }}
                    selectedIndex={selectedSexualCrimeSince}
                    values={selectionSince}
                  >
                    <div>전체</div>
                    <div>최근 1개월</div>
                    <div>최근 6개월</div>
                    <div>최근 1년</div>
                  </SingleSelectionButtons>

                  <FlexBetweenGray disabled={!watchshowSexualCrime}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowSexualCrime}
                        onChange={(e) => {
                          const selectedTime = new Date(e.target.value).getTime()
                          if (selectedTime < Date.now()) {
                            setValue('sexualCrimeSince', selectedTime, { shouldDirty: true })
                            setSexualCrimeSince(selectedTime)
                            setSelectedSexualCrimeSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={formatISOLocalDate(sexualCrimeSince)}
                      />
                      <span> 부터</span>
                    </FlexCenter>
                  </FlexBetweenGray>
                </GridSmallGap>
              </li>
            </Ul>
          </form>
        </FlexMain>
      </Navigation>
    </PageHead>
  )
}

const FlexMain = styled.main`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  padding: 2rem 0;
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

const SingleSelectionButtons = styled(SingleSelectionButtons_)`
  padding: 0.5rem;
`

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 1rem;
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 4;

  background: #fff;
  box-shadow: 0 0 0 0.5rem #fff;
  padding: 1rem 0 0.5rem;
`

const Width = styled.div`
  display: grid;
  gap: 1rem;
  width: fit-content;
  margin: 0 auto;
`

const FlexBetweenGap = styled(FlexBetween)`
  gap: 1rem;
`

const FlexCenterCenterGap = styled(FlexCenterCenter)`
  justify-content: center;
  gap: 0.5rem;
`

const Red = styled.span`
  color: ${(p) => p.theme.warn};
`

type CertAgreementForm = {
  showBirthdate: boolean
  showLegalName: boolean
  showSex: boolean
  showSTDTest: boolean
  stdTestSince: number | null
  showImmunization: boolean
  immunizationSince: number | null
  showSexualCrime: boolean
  sexualCrimeSince: number | null
}

const qrcodeWidth = Math.max(300, Math.min(getViewportWidth(), 350))
const selectionSince = [null, getNMonthBefore(1), getNMonthBefore(6), getNYearBefore(1)]
