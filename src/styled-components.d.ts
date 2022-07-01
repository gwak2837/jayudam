// https://styled-components.com/docs/api#create-a-declarations-file

import 'styled-components'
import { theme } from 'src/styles/global'

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
