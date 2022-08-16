import { toCanvas } from 'qrcode'
import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
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
import { theme } from 'src/styles/global'
import { getViewportWidth } from 'src/utils'
import { MOBILE_MIN_HEIGHT, MOBILE_MIN_WIDTH, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { formatISOLocalDate, getNMonthBefore, getNYearBefore } from 'src/utils/date'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { SubmitButton } from '../register'

export default function QRCodePage() {
  useNeedToLogin()

  const { name } = useRecoilValue(currentUser)

  const qrCodeImageRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    toCanvas(qrCodeImageRef.current, 'jayudam', {
      color: { dark: theme.primaryAchromatic },
      ...rendererOption,
    })
  }, [])

  // Form 상태 관리
  const { handleSubmit, setValue, watch } = useForm<CertAgreementForm>({
    defaultValues: {
      showBirthdate: false,
      showLegalName: false,
      showSex: false,
      showSTDTest: false,
      stdTestSince: null, // WIP: 미래는 선택 불가
      showImmunization: false,
      immunizationSince: null, // WIP: 미래는 선택 불가
      showSexualCrime: false,
      sexualCrimeSince: null, // WIP: 미래는 선택 불가
    },
  })

  const [stdTestSince, setSTDTestSince] = useState('')
  const [immunizationSince, setImmunizationSince] = useState('')
  const [sexualCrimeSince, setSexualCrimeSince] = useState('')

  const [selectedSTDTestSince, setSelectedSTDTestSince] = useState(0)
  const [selectedImmunizationSince, setSelectedImmunizationSince] = useState(0)
  const [selectedSexualCrimeSince, setSelectedSexualCrimeSince] = useState(0)

  const watchshowSTDTest = watch('showSTDTest')
  const watchshowImmunization = watch('showImmunization')
  const watchshowSexualCrime = watch('showSexualCrime')

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
      showLegalName,
      showSex,
      showSTDTest,
      stdTestSince,
      showImmunization,
      immunizationSince,
      showSexualCrime,
      sexualCrimeSince,
    } = input

    updateCertAgreementMutation({
      variables: {
        input: {
          ...(showBirthdate && { showBirthdate }),
          ...(showLegalName && { showLegalName }),
          ...(showSex && { showSex }),
          ...(showSTDTest && { showSTDTest }),
          ...(showSTDTest && stdTestSince && { stdTestSince: new Date(stdTestSince) }),
          ...(showImmunization && { showImmunization }),
          ...(showImmunization &&
            immunizationSince && { immunizationSince: new Date(immunizationSince) }),
          ...(showSexualCrime && { showSexualCrime }),
          ...(showSexualCrime &&
            sexualCrimeSince && { sexualCrimeSince: new Date(sexualCrimeSince) }),
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
          showLegalName,
          showSex,
          showSTDTest,
          stdTestSince,
          showImmunization,
          immunizationSince,
          showSexualCrime,
          sexualCrimeSince,
        } = myCertAgreement

        const stdTestSinceDate = stdTestSince ? new Date(stdTestSince) : null
        const stdTestSinceTime = stdTestSinceDate ? stdTestSinceDate.getTime() : null
        const immunizationSinceDate = immunizationSince ? new Date(immunizationSince) : null
        const immunizationSinceTime = immunizationSinceDate ? immunizationSinceDate.getTime() : null
        const sexualCrimeSinceDate = sexualCrimeSince ? new Date(sexualCrimeSince) : null
        const sexualCrimeSinceTime = sexualCrimeSinceDate ? sexualCrimeSinceDate.getTime() : null

        setValue('showBirthdate', showBirthdate)
        setValue('showLegalName', showLegalName)
        setValue('showSex', showSex)
        setValue('showSTDTest', showSTDTest)
        setValue('stdTestSince', stdTestSinceTime)
        setValue('showImmunization', showImmunization)
        setValue('immunizationSince', immunizationSinceTime)
        setValue('showSexualCrime', showSexualCrime)
        setValue('sexualCrimeSince', sexualCrimeSinceTime)

        const index1 = selectionSince.indexOf(stdTestSinceTime)
        const index2 = selectionSince.indexOf(immunizationSinceTime)
        const index3 = selectionSince.indexOf(sexualCrimeSinceTime)

        setSelectedSTDTestSince(index1)
        setSelectedImmunizationSince(index2)
        setSelectedSexualCrimeSince(index3)

        if (index1 === -1 && stdTestSinceDate) setSTDTestSince(formatISOLocalDate(stdTestSinceDate))
        if (index2 === -1 && immunizationSinceDate)
          setImmunizationSince(formatISOLocalDate(immunizationSinceDate))
        if (index3 === -1 && sexualCrimeSinceDate)
          setSexualCrimeSince(formatISOLocalDate(sexualCrimeSinceDate))

        updateCertAgreementMutation({
          variables: {
            input: {
              ...(showBirthdate && { showBirthdate }),
              ...(showLegalName && { showLegalName }),
              ...(showSex && { showSex }),
              ...(showSTDTest && { showSTDTest }),
              ...(showSTDTest && stdTestSince && { stdTestSince }),
              ...(showImmunization && { showImmunization }),
              ...(showImmunization && immunizationSince && { immunizationSince }),
              ...(showSexualCrime && { showSexualCrime }),
              ...(showSexualCrime && sexualCrimeSince && { sexualCrimeSince }),
            },
          },
        })
      }
    },
    onError: toastApolloError,
    skip: !name,
  })

  const disableInput = certAgreementLoading || updateCertAgreementLoading

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <FlexMain>
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
                    checked={watch('showLegalName')}
                    disabled={disableInput}
                    onChange={(e) => setValue('showLegalName', e.target.checked)}
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
                      checked={watchshowSTDTest}
                      disabled={disableInput}
                      onChange={(e) => setValue('showSTDTest', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchshowSTDTest}
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
                  <FlexBetweenGray disabled={!watchshowSTDTest}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowSTDTest}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value)
                          if (selectedDate < new Date()) {
                            setValue('stdTestSince', selectedDate.getTime())
                            setSTDTestSince(e.target.value)
                            setSelectedSTDTestSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={stdTestSince}
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
                    <AppleCheckbox
                      checked={watchshowImmunization}
                      disabled={disableInput}
                      onChange={(e) => setValue('showImmunization', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchshowImmunization}
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
                  <FlexBetweenGray disabled={!watchshowImmunization}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowImmunization}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value)
                          if (selectedDate < new Date()) {
                            setValue('immunizationSince', selectedDate.getTime())
                            setImmunizationSince(e.target.value)
                            setSelectedImmunizationSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={immunizationSince}
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
                    <AppleCheckbox
                      checked={watchshowSexualCrime}
                      disabled={disableInput}
                      onChange={(e) => setValue('showSexualCrime', e.target.checked)}
                    />
                  </FlexBetween>
                  <SSingleSelectionButtons
                    disabled={!watchshowSexualCrime}
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
                  <FlexBetweenGray disabled={!watchshowSexualCrime}>
                    <label>직접 선택</label>
                    <FlexCenter>
                      <input
                        disabled={!watchshowSexualCrime}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value)
                          if (selectedDate < new Date()) {
                            setValue('sexualCrimeSince', selectedDate.getTime())
                            setSexualCrimeSince(e.target.value)
                            setSelectedSexualCrimeSince(-1)
                          } else {
                            toast.warn('오늘 이후의 날짜는 선택할 수 없어요')
                          }
                        }}
                        type="date"
                        value={sexualCrimeSince}
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

const SSingleSelectionButtons = styled(SingleSelectionButtons)`
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
  background: #fff;
  z-index: 4;
  padding: 1rem 0;
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
const rendererOption = { width: qrcodeWidth }

const selectionSince = [null, getNMonthBefore(1), getNMonthBefore(6), getNYearBefore(1)]
