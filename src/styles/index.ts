import styled, { keyframes } from 'styled-components'

export const Slider = styled.ul<{ padding?: string }>`
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  display: flex;
  padding: ${(p) => p.padding ?? 0};
`

export const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

export const focusInExpandFwd = keyframes`
  0% {
    letter-spacing: -0.5em;
    transform: translateZ(-800px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    filter: blur(0);
    opacity: 1;
  }
`

export const NoMarginH2 = styled.h2`
  margin: 0;
`

export const SquareFrame = styled.div`
  padding-top: 100%;
  position: relative;
`

const skeletonLoading = keyframes`
  0%, 100% {
      background-position: 0 50%;
  }

  50% {
      background-position: 100% 50%;
  }
`

export const Skeleton = styled.div<{
  height?: string
  width?: string
  borderRadius?: string
  inlineBlock?: boolean
  background?: string
}>`
  width: ${(p) => p.width ?? '100%'};
  height: ${(p) => p.height ?? '1.25rem'};
  background: linear-gradient(90deg, #cfd8dc50, #cfd8dca0, #cfd8dc50)
    ${(p) => p.background && `,${p.background}`};
  background-size: 600% 600%;
  border-radius: ${(p) => p.borderRadius ?? '4px'};
  animation: ${skeletonLoading} 3s ease infinite;
  display: ${(p) => (p.inlineBlock ? 'inline-block' : 'block')};
`
