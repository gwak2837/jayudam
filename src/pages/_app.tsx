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
import { ThemeProvider } from 'styled-components'

import { client } from '../apollo/client'
import { toastApolloError } from '../apollo/error'
import { useAuthQuery } from '../graphql/generated/types-and-hooks'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/global'
import {
  NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
} from '../utils/constants'
import { pageview } from '../utils/google-analytics'
import { currentUser } from '../utils/recoil'

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

  useEffect(() => {
    bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover" />
      </Head>

      {/* Global site tag (gtag.js) https://nextjs.org/docs/messages/next-script-for-ga */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {gaScript}
      </Script>

      <Script id="channel-talk" strategy="afterInteractive">
        {channelTalkScript}
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
  const [{ name }, setCurrentUser] = useRecoilState(currentUser)

  useAuthQuery({
    onCompleted: ({ auth: user }) => {
      if (user?.name) {
        setCurrentUser({ name: user.name })
        bootChanneltalk({
          pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
          // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
          profile: {
            name: user.name,
          },
        })
      } else if (user) {
        setCurrentUser({ name: undefined })
        bootChanneltalk({
          pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY,
          // memberId: myNickname.id, // 채널톡-자유담 회원 정보 연동 필요
        })
      }
    },
    onError: (error) => {
      toastApolloError(error)
      globalThis.sessionStorage?.removeItem('jwt')
      globalThis.localStorage?.removeItem('jwt')
      setCurrentUser({ name: null })
      bootChanneltalk({ pluginKey: NEXT_PUBLIC_CHANNELTALK_PLUGIN_KEY })
    },
    // Storage에 jwt가 존재하는데 nickname이 없을 때만
    skip: Boolean(
      name ||
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

const channelTalkScript = `
  (function() {
    var w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
    }
    var ch = function() {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  })();
`

function bootChanneltalk(option: Record<string, any>) {
  globalThis.window?.ChannelIO('shutdown')
  globalThis.window?.ChannelIO('boot', option)
}
