import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode[]
  className?: string
  disabled?: boolean
  selectedIndex?: number
  onChange: (newValue: any, i: number) => void
  values: unknown[]
}

export default function SingleSelectionButtons({
  children,
  className,
  disabled,
  selectedIndex,
  onChange,
  values,
}: Props) {
  return (
    <Ul disabled={disabled}>
      {[...Array(children.length)].map((_, i) => (
        <Button
          key={i}
          className={className}
          disabled={disabled}
          selected={selectedIndex === i}
          onClick={() => selectedIndex !== i && onChange(values[i], i)}
          type="button"
        >
          {children[i]}
        </Button>
      ))}
    </Ul>
  )
}

const Ul = styled.ul<{ disabled?: boolean }>`
  border: 1px solid ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  border-radius: 8px;
  display: flex;
  overflow: hidden;
`

const Button = styled.button<{ selected: boolean }>`
  background: ${(p) =>
    p.disabled ? p.theme.background : p.selected ? p.theme.primaryBackground : '#fff'};
  color: ${(p) =>
    p.disabled ? p.theme.primaryAchromatic : p.selected ? '#000' : p.theme.primaryTextAchromatic};
  cursor: ${(p) => (p.disabled || p.selected ? 'not-allowed' : 'pointer')};
  outline: 1px solid ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  padding: 1rem;
  transition: all 0.2s ease-out;
  width: 100%;

  :hover,
  :focus {
    background: ${(p) =>
      p.disabled
        ? p.theme.background
        : p.selected
        ? p.theme.primaryBackground
        : p.theme.primaryBackgroundAchromatic};
    color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : '#000')};
  }
`
