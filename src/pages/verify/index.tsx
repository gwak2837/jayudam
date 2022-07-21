import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode'
import { CameraDevice } from 'html5-qrcode/esm/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import SingleSelectionButtons from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import { useVerifyCertJwtMutation } from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { getViewportWidth } from 'src/utils'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

export default function VerificationPage() {
  useNeedToLogin()

  const [selectedIndex, setSeletedIndex] = useState(0)

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

  async function startScanningQRCode() {
    if (html5QrcodeRef.current) {
      const devices = await Html5Qrcode.getCameras()

      if (devices && devices.length) {
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

  function resumeScanningQRCode() {
    html5QrcodeRef.current?.resume()
  }

  function changeScanningDevice(deviceId: string) {
    if (html5QrcodeRef.current && scanningDevices) {
      html5QrcodeRef.current.stop()
      html5QrcodeRef.current.start(deviceId, scannerConfig, verifyJwt, undefined)
    }
  }

  // QR code 검증하기
  const [verifyCertJwtMutation, { data, loading }] = useVerifyCertJwtMutation({
    onCompleted: ({ verifyCertJWT }) => {
      if (verifyCertJWT) {
        toast.success('qrcode 인증 완료')
      }
    },
    onError: toastApolloError,
  })

  function verifyJwt(jwt: string) {
    toast.success('qrcode 인식 완료')
    html5QrcodeRef.current?.pause()
    verifyCertJwtMutation({ variables: { jwt } })
  }

  return (
    <PageHead title="인증하기 - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <Absolute show={showStartButton}>
            <h3>카메라를 허용해주세요</h3>
            <button onClick={startScanningQRCode}>허용하기</button>
          </Absolute>

          <AbsoluteTopRight show={showSettingIcon}>
            <button onClick={() => setShowSetting(true)}>O</button>
          </AbsoluteTopRight>

          <AbsoluteSetting show={showSetting}>
            <button onClick={() => setShowSetting(false)}>x</button>

            <h3>카메라 제어</h3>
            <button onClick={stopScanningQRCode}>중지</button>
            <button onClick={resumeScanningQRCode}>재시작</button>

            <h3>카메라 소스</h3>
            {scanningDevices && (
              <SingleSelectionButtons
                onChange={(newDeviceId, i) => {
                  changeScanningDevice(newDeviceId)
                  setSeletedIndex(i)
                }}
                selectedIndex={selectedIndex}
                values={scanningDevices.map((device) => device.id)}
              >
                {scanningDevices.map((device, i) => (
                  <div key={i}>{device.label}</div>
                ))}
              </SingleSelectionButtons>
            )}

            <pre>cert: {JSON.stringify(data)}</pre>
          </AbsoluteSetting>

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
  align-items: center;
`

const Absolute = styled.div<{ show: boolean }>`
  position: absolute;
  inset: 0 0 0 0;

  display: ${(p) => (p.show ? 'flex' : 'none')};
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const AbsoluteSetting = styled.div<{ show: boolean }>`
  position: absolute;
  inset: 0 0 0 0;
  z-index: 1;

  display: ${(p) => (p.show ? 'block' : 'none')};

  background: #fff;
  overflow-y: auto;
`

const AbsoluteTopRight = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  display: ${(p) => (p.show ? 'flex' : 'none')};
`
