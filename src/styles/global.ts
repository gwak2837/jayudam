import { Theme } from 'src/styled-components'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 16px;
  }

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    html,
    body {
      font-size: 18px;
    }
  }

  body {
    padding: 0;
    color: #000;
    font-family: 'Noto Sans KR', Roboto, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
      'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    line-height: normal;
    word-break: keep-all;
  }

  #__next,
  main {
    width: 100%;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  h3 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 0.9rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  a {
    color: ${(p) => p.theme.primaryText};
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  textarea {
    border: none;
    line-height: 1.6rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeIn {
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: fadeIn;
  }

  .fadeOut {
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: fadeOut;
  }
`

// https://material.io/design/color/the-color-system.html#color-theme-creation
export const theme = {
  primary: '#26ade3', // = site.webmanifest theme_color
  primaryAchromatic: '#a1a1a1',
  primaryText: '#007cad',
  primaryTextAchromatic: '#747474',
  primaryBackground: '#93d6f1',
  primaryBackgroundAchromatic: '#ccc',
  background: '#f6f6f6',
  warn: '#800000',
  error: '#D70F0F',
}

export const darkTheme: Theme = {
  primary: '#26ade3',
  primaryAchromatic: '#aaaaaa',
  primaryText: '#',
  primaryTextAchromatic: '#',
  primaryBackground: '#',
  primaryBackgroundAchromatic: '#',
  background: '',
  warn: '#',
  error: '#',
}
