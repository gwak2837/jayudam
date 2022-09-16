import { useLayoutEffect } from 'react'

export default function useScroll() {
  useLayoutEffect(() => {
    const bodyStyle = document.body.style

    window.addEventListener('scroll', setScrollPosition)

    function setScrollPosition() {
      const scrollY = ~~window.scrollY
      if (scrollY < 400) bodyStyle.setProperty('--scroll', `${scrollY}`)
    }

    return () => {
      window.removeEventListener('scroll', setScrollPosition)
    }
  }, [])
}
