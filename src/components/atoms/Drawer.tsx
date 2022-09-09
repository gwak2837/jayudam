import { ReactNode, useEffect, useRef, MouseEventHandler } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { stopPropagation } from '../../utils'

import { TABLET_MIN_WIDTH } from '../../utils/constants'

type Props = {
  children: ReactNode
  lazy?: boolean
  open: boolean
  onClose: () => void
}

export default function Drawer({ children, lazy, open, onClose }: Props) {
  function closeDrawer() {
    onClose()
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose()
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

  const barPosition = useRef([
    { originalX: null, originalY: null },
    { currentX: null, currentY: null },
  ])

  const dragStartHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.target.removeEventListener('mousemove', dragHandler)

    // e.dataTransfer.setDragImage(new Image(), 0, 0)

    console.log(e.pageX, e.pageY)

    // barPosition.current[0].originalX = e.target.offsetLeft
    // barPosition.current[0].originalY = e.target.offsetTop

    // barPosition.current[1].currentX = e.clientX
    // barPosition.current[1].currentY = e.clientY
    e.target.addEventListener('mousemove', dragHandler)
  }

  function dragHandler(e) {
    console.log(e.pageX, e.pageY)

    const currentPosition = barPosition.current[1]

    // e.target.style.left = `${e.target.offsetLeft + e.clientX - (currentPosition.currentX ?? 0)}px`
    // e.target.style.top = `${e.target.offsetTop + e.clientY - (currentPosition.currentY ?? 0)}px`

    // currentPosition.currentX = e.clientX
    // currentPosition.currentY = e.clientY
  }

  function dragEnd(e: any) {
    e.target.removeEventListener('mousemove', dragHandler)

    console.log(e.pageX, e.pageY)

    e.target.style.left = 0
    e.target.style.top = 0
  }

  const drawer = (
    <Transition onClick={stopPropagation}>
      <DrawerInput checked={open} readOnly type="checkbox" />
      <DrawerBackground onClick={closeDrawer} />
      <DrawerSection>
        <GrayBar
          onMouseDown={dragStartHandler}
          onDragStart={() => false}
          // onMouseMove={dragHandler}
          onMouseUp={dragEnd}
        />
        {children}
      </DrawerSection>
    </Transition>
  )

  return createPortal(drawer, document.body)
}

const Transition = styled.div`
  > div {
    transition: background 0.3s ease-out;
  }

  > section {
    transition: 0.3s ease-in-out;
  }
`

const DrawerInput = styled.input`
  display: none;

  :checked ~ div {
    position: fixed;
    inset: 0 0 0 50%;
    width: 100%;
    max-width: ${TABLET_MIN_WIDTH};
    transform: translateX(-50%);
    background: #00000080;
  }

  :checked ~ section {
    bottom: 0;
  }
`

const DrawerBackground = styled.div`
  background: #00000000;
  z-index: 8;
`

const DrawerSection = styled.section`
  position: fixed;
  bottom: -33vh;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: fit-content;
  max-height: 33vh;

  background: #fff;
  border-radius: 20px 20px 0px 0px;
  overflow: auto;
`

const GrayBar = styled.div`
  border-radius: 999px;
  width: 4rem;
  height: 0.5rem;
  padding: 10px 0;
  margin: 0 auto;
  text-align: center;
  background: ${(p) => p.theme.primaryBackgroundAchromatic};

  position: relative;
  /* z-index: 10; */
`
