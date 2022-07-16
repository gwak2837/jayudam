import { toCanvas } from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import AppleCheckbox from 'src/components/atoms/AppleCheckbox'
import PageHead from 'src/components/PageHead'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'

export default function QRCodePage() {
  useNeedToLogin()

  const [a, setA] = useState(false)

  // Generate QR code image
  const qrCodeImageRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    toCanvas(
      qrCodeImageRef.current,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    ).catch((error) => console.error(error))
  }, [])

  return (
    <PageHead title="QR Code - 자유담" description="">
      <Navigation>
        <canvas ref={qrCodeImageRef} />

        <AppleCheckbox
          onChange={(e) => {
            setA(e.target.checked)
          }}
          width="50px"
          background="#26ade3"
          value={a}
        />
      </Navigation>
    </PageHead>
  )
}
