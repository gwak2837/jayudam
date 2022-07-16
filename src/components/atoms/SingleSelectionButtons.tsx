import { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode[]
  initialValue?: unknown
  onClick: (newValue: any) => void
  values: unknown[]
}

export default function SingleSelectionButtons({ children, initialValue, onClick, values }: Props) {
  const [selected, setSelected] = useState(initialValue ?? values[0])

  return (
    <Ul>
      {[...Array(children.length)].map((_, i) => (
        <Button
          key={i}
          disabled={selected === values[i]}
          onClick={() => {
            setSelected(values[i])
            onClick(values[i])
          }}
          type="button"
        >
          {children[i]}
        </Button>
      ))}
    </Ul>
  )
}

const Ul = styled.ul`
  border-radius: 8px;
  display: flex;
  outline: 1px solid ${(p) => p.theme.primary};
  overflow: hidden;
`

const Button = styled.button`
  background: ${(p) => (p.disabled ? p.theme.primaryBackground : '#fff')};
  color: ${(p) => (p.disabled ? '#000' : p.theme.primaryAchromatic)};
  outline: 1px solid ${(p) => p.theme.primary};
  padding: 1rem;
  transition: all 0.2s ease-out;
  width: 100%;

  :hover,
  :focus {
    background: ${(p) =>
      p.disabled ? p.theme.primaryBackground : p.theme.primaryBackgroundAchromatic};
    color: #000;
  }
`
