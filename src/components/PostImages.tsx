import Image from 'next/image'
import { MouseEvent, useState } from 'react'
import styled from 'styled-components'

import XCircleIcon from '../svgs/x-circle.svg'
import { Absolute, Grid as Grid_, Relative } from './atoms/Flex'
import Modal from './atoms/Modal'
import { ImageInfo } from './create-post/PostCreationForm'

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

type Props2 = {
  imageInfos: ImageInfo[]
  onDelete: (id: number) => void
}

export function PostImagesPreview({ imageInfos, onDelete }: Props2) {
  return (
    <div>
      {imageInfos.length == 1 ? (
        <Relative>
          <BorderImage src={imageInfos[0].url} alt={imageInfos[0].name} width="700" height="700" />
          <AbsoluteTopRight as="button" onClick={() => onDelete(imageInfos[0].id)}>
            <XCircleIcon width="1rem" />
          </AbsoluteTopRight>
        </Relative>
      ) : imageInfos.length == 2 ? (
        <Grid2>
          {imageInfos.map((imageInfo, i) => (
            <SquareFrame key={i}>
              <CoverImage src={imageInfo.url} alt={imageInfo.name} fill />
              <AbsoluteTopRight
                as="button"
                onClick={() => onDelete(imageInfos[i].id)}
                type="button"
              >
                <XCircleIcon width="1rem" />
              </AbsoluteTopRight>
            </SquareFrame>
          ))}
        </Grid2>
      ) : imageInfos.length == 3 ? (
        <Grid4>
          {imageInfos.map((imageInfo, i) => (
            <SquareFrame key={i} i={i}>
              <CoverImage src={imageInfo.url} alt={imageInfo.name} fill />
              <AbsoluteTopRight
                as="button"
                onClick={() => onDelete(imageInfos[i].id)}
                type="button"
              >
                <XCircleIcon width="1rem" />
              </AbsoluteTopRight>
            </SquareFrame>
          ))}
        </Grid4>
      ) : imageInfos.length >= 4 ? (
        <Grid4>
          {imageInfos.map((imageInfo, i) => (
            <SquareFrame key={i}>
              <CoverImage src={imageInfo.url} alt={imageInfo.name} fill />
              <AbsoluteTopRight
                as="button"
                onClick={() => onDelete(imageInfos[i].id)}
                type="button"
              >
                <XCircleIcon width="1rem" />
              </AbsoluteTopRight>
            </SquareFrame>
          ))}
        </Grid4>
      ) : null}
    </div>
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

const AbsoluteTopRight = styled(Absolute)`
  top: 0;
  right: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  padding: 0.5rem;
`
