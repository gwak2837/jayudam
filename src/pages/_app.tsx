import 'react-toastify/dist/ReactToastify.min.css'
import 'normalize.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { ReactNode, useEffect } from 'react'
import { ToastContainer, cssTransition } from 'react-toastify'
import { RecoilRoot, useRecoilState } from 'recoil'
import { client } from 'src/apollo/client'
import { toastApolloError } from 'src/apollo/error'
import { useAuthQuery } from 'src/graphql/generated/types-and-hooks'
import { GlobalStyle } from 'src/styles/global'
import { theme } from 'src/styles/global'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from 'src/utils/constants'
import { pageview } from 'src/utils/google-analytics'
import { currentUser } from 'src/utils/recoil'
import { ThemeProvider } from 'styled-components'

// https://github.com/styled-components/styled-components/issues/3738
const ThemeProvider2: any = ThemeProvider
const GlobalStyle2: any = GlobalStyle

export default function JayudamApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Google Analytics 설정
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      const handleRouteChange = (url: string) => pageview(url)
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
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

      <ToastContainer autoClose={2000} hideProgressBar position="top-center" transition={fade} />
    </>
  )
}

type Props = {
  children: ReactNode
}

function Authentication({ children }: Props) {
  const [{ nickname }, setCurrentUser] = useRecoilState(currentUser)

  useAuthQuery({
    onCompleted: ({ myNickname }) => {
      if (myNickname?.nickname) {
        setCurrentUser({ nickname: myNickname.nickname })
      } else {
        setCurrentUser({ nickname: undefined })
      }
    },
    onError: (error) => {
      toastApolloError(error)
      globalThis.sessionStorage?.removeItem('jwt')
      globalThis.localStorage?.removeItem('jwt')
      setCurrentUser({ nickname: null })
    },
    // Storage에 jwt가 존재하는데 nickname이 없을 때만
    skip: Boolean(
      nickname ||
        (!globalThis.sessionStorage?.getItem('jwt') && !globalThis.localStorage?.getItem('jwt'))
    ),
  })

  return <>{children}</>
}

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
