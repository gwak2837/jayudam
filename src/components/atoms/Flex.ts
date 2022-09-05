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

export const FlexCenterCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
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
  gap: 1rem;
`
