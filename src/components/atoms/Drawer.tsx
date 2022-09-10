import { ReactNode, useCallback, useEffect, useRef, TouchEvent, MouseEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { stopPropagation } from '../../utils'

import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from '../../utils/constants'
import { FlexCenterCenter as FlexCenterCenter_ } from './Flex'

let moveListener: any
let endListener: any

type Props = {
  children?: ReactNode
  lazy?: boolean
  open: boolean
  onClose: () => void
}

export default function Drawer({ children, lazy, open, onClose }: Props) {
  // Drag & Drop으로 Drawer 닫기
  const topRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const firstClickPosition = useRef({ clientY: 0, offsetHeight: 0 })

  function prepareMovingDrawer(e: MouseEvent<HTMLDivElement> & TouchEvent<HTMLDivElement>) {
    e.stopPropagation()

    if (topRef.current && drawerRef.current) {
      firstClickPosition.current.clientY = e.clientY ?? e.changedTouches[0].clientY
      firstClickPosition.current.offsetHeight = drawerRef.current.offsetHeight

      if (e.clientY !== undefined) {
        topRef.current.addEventListener('mousemove', moveDrawer)
        topRef.current.addEventListener('mouseup', stopMovingDrawer)
      } else {
        topRef.current.addEventListener('touchmove', moveDrawer)
        topRef.current.addEventListener('touchend', stopMovingDrawer)
      }

      moveListener = moveDrawer
      endListener = stopMovingDrawer
    }
  }

  function moveDrawer(e: any) {
    e.preventDefault()
    e.stopPropagation()

    if (drawerRef.current) {
      const movingOffsetY =
        firstClickPosition.current.clientY - (e.clientY ?? e.changedTouches[0].clientY)
      const height = firstClickPosition.current.offsetHeight + movingOffsetY
      drawerRef.current.style.height = `${height}px`
    }
  }

  function stopMovingDrawer(e: any) {
    e.preventDefault()
    e.stopPropagation()

    if (topRef.current && backgroundRef.current && drawerRef.current) {
      const percent = ~~(
        ((e.clientY ?? e.changedTouches[0].clientY) * 100) /
        backgroundRef.current.clientHeight
      )

      if (percent < 30) {
        removeEventListener()
        drawerRef.current.style.height = '100%'
      } else if (percent < 70) {
        removeEventListener()
        drawerRef.current.removeAttribute('style')
      } else {
        closeDrawer()
      }
    }
  }

  function removeEventListener() {
    if (topRef.current) {
      topRef.current.removeEventListener('mousemove', moveListener)
      topRef.current.removeEventListener('touchmove', moveListener)
      topRef.current.removeEventListener('mouseup', endListener)
      topRef.current.removeEventListener('touchend', endListener)
      moveListener = undefined
      endListener = undefined
    }
  }

  const closeDrawer = useCallback(() => {
    if (topRef.current && drawerRef.current) {
      onClose()
      drawerRef.current.removeAttribute('style')
      firstClickPosition.current = { clientY: 0, offsetHeight: 0 }
      removeEventListener()
    }
  }, [onClose])

  // 배경 스크롤 방지
  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        closeDrawer()
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
  }, [open, onClose, closeDrawer])

  // SSR 대응
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const drawer = (
    <Transition onClick={stopPropagation} ref={topRef}>
      <DrawerInput checked={open} readOnly type="checkbox" />
      <DrawerBackground onClick={closeDrawer} ref={backgroundRef} />
      <DrawerSection ref={drawerRef}>
        <FlexCenterCenter onMouseDown={prepareMovingDrawer} onTouchStart={prepareMovingDrawer}>
          <GrayBar />
        </FlexCenterCenter>
        {children}
      </DrawerSection>
    </Transition>
  )

  return show
    ? lazy
      ? open
        ? createPortal(drawer, document.body)
        : null
      : createPortal(drawer, document.body)
    : null
}

const Transition = styled.div`
  > section {
    transition: transform 0.3s ease-out, height 0.1s ease-out;
  }
`

const DrawerInput = styled.input`
  display: none;

  :checked ~ div {
    z-index: 10;
    opacity: 0.5;
  }

  :checked ~ section {
    transform: translate(-50%, 0%);
  }
`

const DrawerBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;

  background: #000;
  opacity: 0;
`

const DrawerSection = styled.section`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  z-index: 10;

  width: 100%;
  max-width: ${MOBILE_MIN_HEIGHT};
  height: 50%;

  background: #fff;
  border: 1px solid #888;
  border-radius: 1.5rem 1.5rem 0px 0px;
  overflow: auto;
`

const FlexCenterCenter = styled(FlexCenterCenter_)`
  position: sticky;
  top: 0;

  background: #fff;
  padding: 0.5rem 0;
`

const GrayBar = styled.div`
  background: ${(p) => p.theme.primaryBackgroundAchromatic};
  border-radius: 999px;
  width: 5rem;
  height: 0.5rem;
`
