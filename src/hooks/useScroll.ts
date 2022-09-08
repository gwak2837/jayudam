import { useLayoutEffect } from 'react'

export default function useScroll() {
  useLayoutEffect(() => {
    const bodyStyle = document.body.style

    window.addEventListener('scroll', setScrollPosition, { passive: true })

    function setScrollPosition() {
      const scrollY = ~~window.scrollY
      if (scrollY < 500) bodyStyle.setProperty('--scroll', `${scrollY}`)
    }

    return () => {
      window.removeEventListener('scroll', setScrollPosition)
    }
  }, [])
}
