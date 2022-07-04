import { toCanvas } from 'qrcode'
import { useEffect, useRef } from 'react'
import PageHead from 'src/components/PageHead'
import { useGetCertificateJwtLazyQuery } from 'src/graphql/generated/types-and-hooks'
import useNeedToLogin from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'

export default function QRCodePage() {
  useNeedToLogin()

  const [a, b] = useGetCertificateJwtLazyQuery()

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
      </Navigation>
    </PageHead>
  )
}
