import { useState } from 'react'
import styled from 'styled-components'

type Props = {
  background?: string
  checked?: boolean
  disabled?: boolean
  onChange: (value: any) => any
  width?: string
}

export default AppleCheckbox

function AppleCheckbox({
  background = '#26ade3',
  checked,
  disabled = false,
  onChange,
  width = '50px',
}: Props) {
  return (
    <Label disabled={disabled} background={background} width={width}>
      <Input checked={checked} disabled={disabled} onChange={onChange} type="checkbox" />
      <Span width={width} />
    </Label>
  )
}

const Label = styled.label<{ width: string; background: string; disabled: boolean }>`
  text-align: left;
  width: ${(p) => p.width};
  height: calc(${(p) => p.width} / 2);
  border-radius: 9999px;
  background: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  display: inline-block;
  position: relative;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const Input = styled.input`
  opacity: 0;
  position: absolute;

  :checked:focus ~ span {
    box-shadow: 0 0 0 4px #fff;
  }

  :checked ~ span:before {
    transform: scale(0);
    opacity: 0.7;
  }

  :checked ~ span:after {
    transform: translate3d(100%, -50%, 0);
  }
`

const Span = styled.span<{ width: string }>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 9999px;

  :before,
  :after {
    content: '';
    cursor: pointer;
    position: absolute;
  }

  :before {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #f1f1f1;
    border-radius: 9999px;
    transition: opacity 0.2s ease-out 0.1s, transform 0.2s ease-out 0.1s;
    transform: scale(1);
    opacity: 1;
  }

  :after {
    top: 50%;
    z-index: 3;
    transition: transform 0.4s cubic-bezier(0.44, -0.12, 0.07, 1.15);
    width: calc(${(p) => p.width} / 2);
    height: calc(${(p) => p.width} / 2);
    transform: translate3d(0, -50%, 0);
    background-color: #fff;
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`
