import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Navigation({ children }: Props) {
  return <>{children}</>
}

export default Navigation
