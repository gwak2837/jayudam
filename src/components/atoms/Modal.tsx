import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import XIcon from '../../svgs/x-white.svg'

type Props = {
  children: ReactNode
  lazy?: boolean
  open: boolean
  onClose: (open: boolean) => void
  showCloseButton?: boolean
}

export default function Modal({ children, lazy, open, onClose, showCloseButton = true }: Props) {
  function closeModal(e: any) {
    e.stopPropagation()
    onClose(false)
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose(false)
      }
    }

    if (open) {
      const bodyStyle = document.body.style

      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', closeOnEscapeKey, false)
        bodyStyle.overflow = ''
      }
    }
  }, [open, onClose])

  const modal = (
    <FixedFullscreen open={open} onClick={closeModal}>
      {showCloseButton && <XIcon onClick={closeModal} />}
      {children}
    </FixedFullscreen>
  )

  return lazy
    ? open
      ? createPortal(modal, document.body)
      : null
    : createPortal(modal, document.body)
}

const FixedFullscreen = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0 0 0 0;
  z-index: ${(p) => (p.open ? 10 : -1)};

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(p) => (p.open ? '#00000040' : 'none')};
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  visibility: ${(p) => (p.open ? 'visible' : 'hidden')};

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;

    width: 2.2rem;
    padding: 0.6rem;
    cursor: pointer;
  }
`
