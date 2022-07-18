import { Html5Qrcode } from 'html5-qrcode'
import { CameraDevice, Html5QrcodeResult } from 'html5-qrcode/esm/core'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import SingleSelectionButtons from 'src/components/atoms/SingleSelectionButtons'
import PageHead from 'src/components/PageHead'
import { useVerifyCertJwtMutation } from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { viewportWidth } from 'src/utils'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

export default function VerificationPage() {
  useNeedToLogin()

  // 카메라 영역 설정
  const html5QrcodeRef = useRef<Html5Qrcode>()

  useEffect(() => {
    html5QrcodeRef.current = new Html5Qrcode('reader')
  }, [])

  // Start scanning QR code
  const [scanningDevices, setScanningDevices] = useState<CameraDevice[]>()
  const [decodedResult, setDecodedResult] = useState<any>()

  async function startScanningQRCode() {
    if (html5QrcodeRef.current) {
      const devices = await Html5Qrcode.getCameras()

      if (devices && devices.length) {
        setScanningDevices(devices)
      }

      html5QrcodeRef.current.start(devices[0].id, qrcodeConfig, verifyJwt, undefined)
    }
  }

  function stopScanningQRCode() {
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop()
    }
  }

  function changeScanningDevice(deviceId: string) {
    if (html5QrcodeRef.current && scanningDevices) {
      html5QrcodeRef.current.stop()
      html5QrcodeRef.current.start(deviceId, qrcodeConfig, verifyJwt, undefined)
    }
  }

  function verifyJwt(jwt: string) {
    toast.success('qrcode 인식 완료')
    verifyCertJwtMutation({ variables: { jwt } })
  }

  const [verifyCertJwtMutation, { loading }] = useVerifyCertJwtMutation({
    onCompleted: ({ verifyCertJWT }) => {
      setDecodedResult(verifyCertJWT)
    },
    onError: toastApolloError,
  })

  return (
    <PageHead title="인증하기 - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <button onClick={startScanningQRCode}>start</button>
          <button onClick={stopScanningQRCode}>stop</button>
          <br />

          {scanningDevices && (
            <SingleSelectionButtons
              onClick={(newDeviceId) => changeScanningDevice(newDeviceId)}
              values={scanningDevices.map((device) => device.id)}
            >
              {scanningDevices.map((device, i) => (
                <div key={i}>{device.label}</div>
              ))}
            </SingleSelectionButtons>
          )}

          <pre>decodedResult: {decodedResult}</pre>

          <br />
          <div id="reader" />
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const qrcodeConfig = {
  fps: 2,
  qrbox: {
    width: Math.max(250, Math.min(viewportWidth, 300)),
    height: Math.max(250, Math.min(viewportWidth, 300)),
  },
}

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
  overflow: hidden;
`
