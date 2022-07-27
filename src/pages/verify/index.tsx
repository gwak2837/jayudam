import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode'
import { CameraDevice } from 'html5-qrcode/esm/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import Modal from 'src/components/atoms/Modal'
import SingleSelectionButtons from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import {
  Sex,
  useSampleCertJwtLazyQuery,
  useVerifyCertJwtMutation,
} from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getViewportWidth } from 'src/utils'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH, TABLET_MIN_WIDTH_1 } from 'src/utils/constants'
import { formatISOLocalDate } from 'src/utils/date'
import styled from 'styled-components'

import FlipIcon from '../../svgs/flip.svg'
import SettingIcon from '../../svgs/setting.svg'
import TestTubeIcon from '../../svgs/test-tube.svg'
import VerifyIcon from '../../svgs/verify.svg'
import XIcon from '../../svgs/x-button.svg'

export default function VerificationPage() {
  useNeedToLogin()

  // 카메라 영역 설정
  const html5QrcodeRef = useRef<Html5Qrcode>()

  useEffect(() => {
    html5QrcodeRef.current = new Html5Qrcode('reader')

    return () => {
      if (html5QrcodeRef.current) {
        switch (html5QrcodeRef.current.getState()) {
          case Html5QrcodeScannerState.PAUSED:
          case Html5QrcodeScannerState.SCANNING:
            html5QrcodeRef.current.stop()
        }
      }
    }
  }, [])

  // QR code 읽기 시작/중지/변경
  const [scanningDevices, setScanningDevices] = useState<CameraDevice[]>()
  const [showStartButton, setShowStartButton] = useState(true)
  const [showSettingIcon, setShowSettingIcon] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [selectedIndex, setSeletedIndex] = useState(0)

  const scanningDeviceIds = scanningDevices?.map((device) => device.id)

  async function startScanningQRCode() {
    if (html5QrcodeRef.current) {
      const devices = await Html5Qrcode.getCameras()

      if (devices && devices.length > 0) {
        setScanningDevices(devices)
      }

      setShowStartButton(false)
      setShowSettingIcon(true)
      html5QrcodeRef.current.start(devices[0].id, scannerConfig, verifyJwt, undefined)
    }
  }

  function stopScanningQRCode() {
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop()
      setShowStartButton(true)
      setShowSettingIcon(false)
      setShowSetting(false)
    }
  }

  function pauseScanningQRCode() {
    try {
      html5QrcodeRef.current?.pause()
    } catch (error) {
      console.error(error)
    }
  }

  function resumeScanningQRCode() {
    if (html5QrcodeRef.current?.getState() === Html5QrcodeScannerState.PAUSED) {
      html5QrcodeRef.current.resume()
    }
  }

  function changeScanningDevice(deviceId: string) {
    if (html5QrcodeRef.current && scanningDevices) {
      html5QrcodeRef.current.stop()
      html5QrcodeRef.current.start(deviceId, scannerConfig, verifyJwt, undefined)
    }
  }

  function toggleScanningDevice() {
    if (scanningDevices && scanningDeviceIds) {
      if (selectedIndex === scanningDevices.length - 1) {
        setSeletedIndex(0)
        changeScanningDevice(scanningDeviceIds[0])
      } else {
        setSeletedIndex(selectedIndex + 1)
        changeScanningDevice(scanningDeviceIds[selectedIndex + 1])
      }
    }
  }

  // QR code 검증하기
  const [showResult, setShowResult] = useState(false)

  const [verifyCertJwtMutation, { data, loading }] = useVerifyCertJwtMutation({
    onCompleted: ({ verifyCertJWT }) => {
      if (verifyCertJWT) {
        toast.success('QR code 인증 완료')
        setShowResult(true)
      }
    },
    onError: toastApolloError,
  })

  const allCerts = data?.verifyCertJWT
  const stdTestCerts = allCerts?.stdTestCerts
  const immunizationCerts = allCerts?.immunizationCerts
  const sexualCrimeCerts = allCerts?.sexualCrimeCerts

  function verifyJwt(jwt: string) {
    toast.success('QR code 인식 완료')
    resumeScanningQRCode()
    setShowResult(true)
    setShowSetting(false)
    setShowSettingIcon(false)
    verifyCertJwtMutation({ variables: { jwt } })
  }

  // 테스트용 QR code
  const [sampleCertJwtQuery, { loading: sampleCertJWTLoading }] = useSampleCertJwtLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: ({ sampleCertJWT }) => {
      if (sampleCertJWT) {
        toast.success('테스트용 QR code 인식 완료')
        pauseScanningQRCode()
        setShowResult(true)
        setShowSetting(false)
        setShowSettingIcon(false)
        verifyCertJwtMutation({ variables: { jwt: sampleCertJWT } })
      }
    },
    onError: toastApolloError,
  })

  function getSampleCertJWT() {
    sampleCertJwtQuery()
  }

  // Modal
  const [openSTDTest, setOpenSTDTest] = useState<boolean[]>([])

  function openSTDTestModal(i: number) {
    return () => {
      openSTDTest[i] = true
      setOpenSTDTest([...openSTDTest])
    }
  }

  function closeSTDTestModal(i: number) {
    return (newValue: boolean) => {
      openSTDTest[i] = newValue
      setOpenSTDTest([...openSTDTest])
    }
  }

  return (
    <PageHead title="인증하기 - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <AbsoluteFullFlex show={showStartButton}>
            <h3>카메라 스캔을 시작해주세요</h3>
            <button onClick={startScanningQRCode}>시작하기</button>
          </AbsoluteFullFlex>

          <AbsoluteTop show={showSettingIcon}>
            <FlexBetween>
              <button disabled={!scanningDevices} onClick={toggleScanningDevice}>
                <FlipIcon />
              </button>
              <button disabled={sampleCertJWTLoading} onClick={getSampleCertJWT}>
                <TestTubeIcon />
              </button>
              <button disabled={!scanningDevices} onClick={() => setShowSetting(true)}>
                <SettingIcon />
              </button>
            </FlexBetween>
          </AbsoluteTop>

          <AbsoluteFull show={showSetting}>
            <FlexReverseRow>
              <button onClick={() => setShowSetting(false)}>
                <XIcon />
              </button>
            </FlexReverseRow>

            <GridGap>
              <div>
                <h3>카메라 제어</h3>
                <button onClick={stopScanningQRCode}>중지</button>
                <button onClick={resumeScanningQRCode}>재시작</button>
              </div>

              <div>
                <h3>카메라 입력</h3>
                {scanningDevices && scanningDeviceIds && (
                  <SingleSelectionButtons
                    onChange={(newDeviceId, i) => {
                      changeScanningDevice(newDeviceId)
                      setSeletedIndex(i)
                    }}
                    selectedIndex={selectedIndex}
                    values={scanningDeviceIds}
                  >
                    {scanningDevices.map((device, i) => (
                      <div key={i}>{device.label}</div>
                    ))}
                  </SingleSelectionButtons>
                )}
              </div>
            </GridGap>
          </AbsoluteFull>

          <AbsoluteFull show={showResult}>
            <FlexReverseRow>
              <button
                onClick={() => {
                  setShowSettingIcon(true)
                  setShowResult(false)
                  resumeScanningQRCode()
                }}
              >
                <XIcon />
              </button>
            </FlexReverseRow>

            <GridGap>
              {allCerts && (
                <Overflow>
                  <CenterTable>
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>성별</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{allCerts.name ?? '미동의'}</td>
                        <td>
                          {allCerts.birthdate ? formatISOLocalDate(allCerts.birthdate) : '미동의'}
                        </td>
                        <td>{allCerts.sex ? formatSex(allCerts.sex as Sex) : '미동의'}</td>
                      </tr>
                    </tbody>
                  </CenterTable>
                </Overflow>
              )}

              <h3>성병검사</h3>
              {stdTestCerts ? (
                stdTestCerts.length > 0 ? (
                  <Overflow>
                    <CursorTable>
                      <thead>
                        <tr>
                          <th>결과</th>
                          <th>이름</th>
                          <th>검사일</th>
                          <th>발급일</th>
                          <th>장소</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stdTestCerts.map((cert, i) => (
                          <RelativeTr key={cert.id} onClick={openSTDTestModal(i)}>
                            <td>{formatSTDTestResult(cert.content)}</td>
                            <td>{cert.name}</td>
                            <td>{formatISOLocalDate(cert.effectiveDate)}</td>
                            <td>{formatISOLocalDate(cert.issueDate)}</td>
                            <td>{cert.location}</td>
                            <Modal open={openSTDTest[i]} onClose={closeSTDTestModal(i)}>
                              <AnimatedDiv open={openSTDTest[i]}>
                                <pre style={{ overflow: 'auto' }}>
                                  {JSON.stringify(JSON.parse(cert.content ?? '{}'), null, 2)}
                                </pre>
                              </AnimatedDiv>
                            </Modal>
                          </RelativeTr>
                        ))}
                      </tbody>
                    </CursorTable>
                  </Overflow>
                ) : (
                  <p>내역이 존재하지 않아요</p>
                )
              ) : (
                <p>상대방이 동의하지 않았어요</p>
              )}

              <GridSmallGap>
                <h3>성병예방접종</h3>
                {immunizationCerts ? (
                  immunizationCerts.length > 0 ? (
                    <>
                      <PrimaryText>
                        최근 발급일: {formatISOLocalDate(immunizationCerts[0].issueDate)}
                      </PrimaryText>
                      <Overflow>
                        <CenterTable>
                          <thead>
                            <tr>
                              <th>접종명</th>
                              <th>접종차수</th>
                              <th>접종일</th>
                              <th>접종기관</th>
                            </tr>
                          </thead>
                          <tbody>
                            {immunizationCerts.map((cert) => (
                              <RelativeTr key={cert.id}>
                                <td>{cert.name}</td>
                                <td>{JSON.parse(cert.content!).series}</td>
                                <td>{formatISOLocalDate(cert.effectiveDate)}</td>
                                <td>{cert.location}</td>
                              </RelativeTr>
                            ))}
                          </tbody>
                        </CenterTable>
                      </Overflow>
                    </>
                  ) : (
                    <p>내역이 존재하지 않아요</p>
                  )
                ) : (
                  <p>상대방이 동의하지 않았어요</p>
                )}
              </GridSmallGap>

              <GridSmallGap>
                <h3>성범죄</h3>
                {sexualCrimeCerts ? (
                  sexualCrimeCerts.length > 0 ? (
                    <>
                      <PrimaryText>
                        최근 발급일: {formatISOLocalDate(sexualCrimeCerts[0].issueDate)}
                      </PrimaryText>
                      <Overflow>
                        <CenterTable>
                          <thead>
                            <tr>
                              <th>처분결과</th>
                              <th>죄명</th>
                              <th>처분일자</th>
                              <th>처분관서</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sexualCrimeCerts.map((cert) => (
                              <RelativeTr key={cert.id}>
                                <td>{JSON.parse(cert.content ?? '{}').result}</td>
                                <td>{cert.name}</td>
                                <td>{formatISOLocalDate(cert.effectiveDate)}</td>
                                <td>{cert.location}</td>
                              </RelativeTr>
                            ))}
                          </tbody>
                        </CenterTable>
                      </Overflow>
                    </>
                  ) : (
                    <p>내역이 존재하지 않아요</p>
                  )
                ) : (
                  <p>상대방이 동의하지 않았어요</p>
                )}
              </GridSmallGap>
            </GridGap>

            {loading}
          </AbsoluteFull>

          <div id="reader" />
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const scannerConfig = {
  fps: 2,
  qrbox: {
    width: Math.max(250, Math.min(getViewportWidth(), 300)),
    height: Math.max(250, Math.min(getViewportWidth(), 300)),
  },
}

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
  min-height: inherit;
  position: relative;

  display: grid;
  grid-template-rows: 1fr;
  align-items: center;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
  }
`

const FlexReverseRow = styled.div`
  display: flex;
  flex-flow: row-reverse;

  > button > svg {
    width: 3rem;
    padding: 0.5rem;
  }
`

const AbsoluteFullFlex = styled.div<{ show: boolean }>`
  display: ${(p) => (p.show ? 'flex' : 'none')};
  flex-flow: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${TABLET_MIN_WIDTH_1}) {
    position: absolute;
    inset: 0 0 0 0;
  }
`

const AbsoluteFull = styled.div<{ show: boolean }>`
  position: absolute;
  inset: 0 0 0 0;
  z-index: 2;

  background: #fff;
  display: ${(p) => (p.show ? 'block' : 'none')};
  overflow-y: auto;
`

const AbsoluteTop = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  display: ${(p) => (p.show ? 'block' : 'none')};
`

const GridGap = styled.div`
  display: grid;
  gap: 3rem;

  padding: 1rem;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 1rem;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > button > svg {
    width: 3rem;
    padding: 0.5rem;
  }
`

const Overflow = styled.div`
  /* box-shadow: 0 0 0 1px ${(p) => p.theme.primaryAchromatic}; */
  max-height: 50vh;
  overflow: auto;
  position: relative;
`

const CenterTable = styled.table`
  border-spacing: 0;
  width: 100%;

  th,
  td {
    background: #fff;
    box-shadow: 0 0 0 1px ${(p) => p.theme.primaryAchromatic};
    padding: 0.5rem;
    text-align: center;
    white-space: nowrap;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  svg {
    width: 1.3rem;
    vertical-align: middle;
  }
`

const CursorTable = styled(CenterTable)`
  td {
    cursor: pointer;
    :hover {
      background: ${(p) => p.theme.background};
    }
  }
`

const RelativeTr = styled.tr`
  position: relative;
`

const AnimatedDiv = styled.div<{ open: boolean }>`
  width: ${(p) => (p.open ? '90%' : '0')};
  height: ${(p) => (p.open ? '90%' : '0')};
  background: #fee;
  z-index: ${(p) => (p.open ? 10 : 0)};

  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1);
`

const PrimaryText = styled.div`
  color: ${(p) => p.theme.primaryText};
`

const DangerText = styled.h4`
  color: ${(p) => p.theme.error};
`

function formatSex(sex?: Sex) {
  switch (sex) {
    case Sex.Unknown:
      return '알 수 없음'
    case Sex.Male:
      return '남'
    case Sex.Female:
      return '여'
    case Sex.Other:
      return '기타'
    default:
      return sex
  }
}

function formatSTDTestResult(content?: string | null) {
  if (!content) return ''

  const testResult = JSON.parse(content)

  let positiveCount = 0
  for (const s of Object.values(testResult) as string[]) {
    if (s !== '음성' && s !== 'Non Reactive') positiveCount++
  }

  switch (positiveCount) {
    case 0:
      return <VerifyIcon />
    default:
      return <DangerText>{positiveCount}</DangerText>
  }
}
