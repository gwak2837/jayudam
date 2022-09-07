import { useLayoutEffect } from 'react'

export default function useScroll() {
  useLayoutEffect(() => {
    function setScrollY() {
      const scrollY = ~~window.scrollY
      if (scrollY < 500) document.body.style.setProperty('--scroll', `${scrollY}px`)
    }
    window.addEventListener('scroll', setScrollY, { passive: true })

    return () => window.removeEventListener('scroll', setScrollY)
  }, [])

  return
}
