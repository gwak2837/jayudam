import PageHead from 'src/components/PageHead'
import Navigation from 'src/layouts/Navigation'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

export default function SubmitPage() {
  return (
    <PageHead title="제출하기 - 자유담" description="">
      <Navigation>
        <MaxWidth>
          <FlexCenterCenter>
            <input />
            <button>제출</button>
          </FlexCenterCenter>
        </MaxWidth>
      </Navigation>
    </PageHead>
  )
}

const MaxWidth = styled.main`
  max-width: ${TABLET_MIN_WIDTH};
  min-height: inherit;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
  }
`

const FlexCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: inherit;
  position: relative;
`
