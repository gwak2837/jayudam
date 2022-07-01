import 'react-toastify/dist/ReactToastify.min.css'
import 'normalize.css'

import { ApolloProvider } from '@apollo/client'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import type { ReactElement, ReactNode } from 'react'
import React, { useEffect } from 'react'
import { ToastContainer, cssTransition } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import { client } from 'src/apollo/client'
import Authentication from 'src/components/Authentication'
import { GlobalStyle } from 'src/styles/global'
import { theme } from 'src/styles/global'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from 'src/utils/constants'
import { pageview } from 'src/utils/google-analytics'
import styled, { ThemeProvider } from 'styled-components'

// https://github.com/styled-components/styled-components/issues/3738
const ThemeProvider2: any = ThemeProvider
const GlobalStyle2: any = GlobalStyle

const fade = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut',
})

const gaScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {page_path: window.location.pathname});
`

export default function AlpacaSalonApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Google Analytics 초기 설정
  useEffect(() => {
    const handleRouteChange = (url: string) => pageview(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Global site tag (gtag.js) https://nextjs.org/docs/messages/next-script-for-ga */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {gaScript}
      </Script>

      <main>
        <ThemeProvider2 theme={theme}>
          <GlobalStyle2 />
          <ApolloProvider client={client}>
            <RecoilRoot>
              <Authentication>
                <Component {...pageProps} />
              </Authentication>
            </RecoilRoot>
          </ApolloProvider>
        </ThemeProvider2>
      </main>
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" transition={fade} />
    </>
  )
}
