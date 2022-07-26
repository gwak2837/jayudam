import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import XIcon from 'src/svgs/x-white.svg'
import styled from 'styled-components'

const FixedFullscreen = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0 0 0 0;
  z-index: ${(p) => (p.open ? 10 : -1)};

  display: flex;
  justify-content: center;
  align-items: center;

  background: #00000080;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);

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

type Props = {
  children: ReactNode
  lazy?: boolean
  open: boolean
  onClose: (open: boolean) => void
}

function Modal({ children, lazy, open, onClose }: Props) {
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
      // const scrollY = window.scrollY

      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'
      // bodyStyle.position = 'fixed' // For Safari 15
      // bodyStyle.top = `-${scrollY}px` // For Safari 15

      return () => {
        document.removeEventListener('keydown', closeOnEscapeKey, false)
        bodyStyle.overflow = ''
        // bodyStyle.position = '' // For Safari 15
        // bodyStyle.top = '' // For Safari 15
        // window.scrollTo(0, scrollY) // For Safari 15
      }
    }
  }, [open, onClose])

  const modal = (
    <FixedFullscreen open={open} onClick={closeModal}>
      <XIcon onClick={closeModal} />
      {children}
    </FixedFullscreen>
  )

  return lazy
    ? open
      ? createPortal(modal, document.body)
      : null
    : createPortal(modal, document.body)
}

export default Modal
