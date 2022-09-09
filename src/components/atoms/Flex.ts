import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
`

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
`

export const FlexBetweenCenter = styled(FlexBetween)`
  align-items: center;
`

export const FlexCenter = styled(Flex)`
  align-items: center;
`

export const FlexCenterSmallGap = styled(FlexCenter)`
  gap: 0.4rem;
`

export const FlexCenterCenter = styled(FlexCenter)`
  justify-content: center;
`

export const FlexColumn = styled(Flex)`
  flex-flow: column;
`

export const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const GridGap = styled.div`
  display: grid;
  gap: 0.75rem;
`

export const GridBigGap = styled.div`
  display: grid;
  gap: 1rem;
`

export const GrayText = styled.span`
  color: #888;
`

export const Relative = styled.div`
  position: relative;
`

export const Absolute = styled.div`
  position: absolute;
`

export const TextOverflow = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
