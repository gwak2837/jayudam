import { ReactNode, useState } from 'react'
import styled from 'styled-components'

import CheckBoxIcon from '../../svgs/CheckBoxIcon'
import { FlexCenter } from './Flex'

type Props2 = {
  children: ReactNode
  id: string
  initialValue?: boolean
  onChange: (newValue: boolean) => void
}

export default function Checkbox({ children, id, initialValue, onChange }: Props2) {
  const [isChecked, setIsChecked] = useState(initialValue ?? false)

  function toggleChecked(e: any) {
    onChange(e.target.checked)
    if (e.target.checked) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }

  return (
    <AutoLogin as="label" htmlFor={`checkbox-${id}`}>
      <InvisibleInput
        id={`checkbox-${id}`}
        checked={isChecked}
        onChange={toggleChecked}
        type="checkbox"
      />
      <CheckBoxIcon isChecked={isChecked} />
      {children}
    </AutoLogin>
  )
}

const AutoLogin = styled(FlexCenter)`
  gap: 0.4rem;
  cursor: pointer;
`

const InvisibleInput = styled.input`
  display: none;
`
