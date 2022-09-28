import Image from 'next/future/image'
import { MouseEvent, useState } from 'react'
import styled from 'styled-components'

import { Grid as Grid_ } from './atoms/Flex'
import Modal from './atoms/Modal'

type Props = {
  imageUrls: string[]
}

export function PostImages({ imageUrls }: Props) {
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openModal(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()
    setIsModalOpened(true)
  }

  function closeModal() {
    setIsModalOpened(false)
  }

  return (
    <>
      <div onClick={openModal}>
        {imageUrls.length == 1 ? (
          <BorderImage src={imageUrls[0]} alt={imageUrls[0]} width="700" height="700" />
        ) : imageUrls.length == 2 ? (
          <Grid2>
            {imageUrls.map((imageUrl, i) => (
              <SquareFrame key={i}>
                <CoverImage src={imageUrl} alt={imageUrl} fill />
              </SquareFrame>
            ))}
          </Grid2>
        ) : imageUrls.length == 3 ? (
          <Grid4>
            {imageUrls.map((imageUrl, i) => (
              <SquareFrame key={i} i={i}>
                <CoverImage src={imageUrl} alt={imageUrl} fill />
              </SquareFrame>
            ))}
          </Grid4>
        ) : imageUrls.length >= 4 ? (
          <Grid4>
            {imageUrls.map((imageUrl, i) => (
              <SquareFrame key={i}>
                <CoverImage src={imageUrl} alt={imageUrl} fill />
              </SquareFrame>
            ))}
          </Grid4>
        ) : null}
      </div>

      <Modal lazy open={isModalOpened} onClose={closeModal}>
        <KeepRatioImage src={imageUrls[0]} alt={imageUrls[0]} width="1000" height="1000" />
      </Modal>
    </>
  )
}

const CoverImage = styled(Image)`
  object-fit: cover;
`

const KeepRatioImage = styled(CoverImage)`
  width: 100%;
  height: auto;
  max-height: 100vh;
`

const BorderImage = styled(KeepRatioImage)`
  border: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
  border-radius: 0.5rem;
`

const Grid2 = styled(Grid_)`
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem;

  aspect-ratio: 16 / 9;
  border: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
`

const Grid4 = styled(Grid2)`
  grid-template-rows: 1fr 1fr;
`

const SquareFrame = styled.div<{ i?: number }>`
  position: relative;
  ${(p) => p.i === 0 && 'grid-row: span 2;'}
`
