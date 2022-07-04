import { Html5Qrcode } from 'html5-qrcode'
import { CameraDevice, Html5QrcodeResult } from 'html5-qrcode/esm/core'
import { useEffect, useRef, useState } from 'react'
import PageHead from 'src/components/PageHead'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'

export default function VerificationPage() {
  useNeedToLogin()

  // Set up the camera for scanning QR code
  const html5QrcodeRef = useRef<Html5Qrcode>()

  useEffect(() => {
    html5QrcodeRef.current = new Html5Qrcode('reader')
  }, [])

  // Start scanning QR code
  const [cameraDevice, setCameraDevice] = useState<CameraDevice[]>()
  const [decodedResult, setDecodedResult] = useState<Html5QrcodeResult>()

  async function startScanningQRCode() {
    if (html5QrcodeRef.current) {
      const devices = await Html5Qrcode.getCameras()

      if (devices && devices.length) {
        setCameraDevice(devices)
      }

      html5QrcodeRef.current.start(
        devices[0].id,
        { fps: 2, qrbox: { width: 250, height: 250 } },
        (_, decodedResult) => setDecodedResult(decodedResult),
        undefined
      )
    }
  }

  function stopScanningQRCode() {
    if (html5QrcodeRef.current) {
      html5QrcodeRef.current.stop()
    }
  }

  return (
    <PageHead title="인증하기 - 자유담" description="">
      <Navigation>
        <button onClick={startScanningQRCode}>start</button>
        <button onClick={stopScanningQRCode}>stop</button>
        <br />
        <div id="reader" />
        <br />
        <pre>cameraDevice: {JSON.stringify(cameraDevice, null, 2)}</pre>
        <pre>decodedResult: {JSON.stringify(decodedResult, null, 2)}</pre>
      </Navigation>
    </PageHead>
  )
}
