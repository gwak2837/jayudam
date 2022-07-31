import React, { KeyboardEvent } from 'react'
import PageHead from 'src/components/PageHead'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import styled from 'styled-components'

type PostCreationInput = {
  title: string
  contents: string
}

export type ImageInfo = {
  id: number
  url: string
}

export const AbsoluteH3 = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #fff;
  border-bottom: 1px solid #e0e0e0;

  > svg {
    padding: 1rem;
    width: 3rem;
    cursor: pointer;
  }
`

export const TransparentButton = styled.button`
  background: none;
  color: ${(p) => (p.disabled ? '#888' : '#000')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem;
`

export const GroupButton = styled.button<{ isSelected: boolean }>`
  margin: 0.5rem 0.3rem;
  padding: 0.5rem 0.8rem;
  border: 1px solid ${(p) => (p.isSelected ? p.theme.primary : p.theme.primaryAchromatic)};
  border-radius: 50px;
  color: ${(p) => (p.isSelected ? 'white' : p.theme.primaryAchromatic)};
  background-color: ${(p) => (p.isSelected ? p.theme.primary : 'white')};
`

export const Input = styled.input<{ erred?: boolean }>`
  border: none;
  border-bottom: 2px solid ${(p) => (p.erred ? p.theme.error : p.theme.primaryAchromatic)};
  border-radius: 0;
  color: ${(p) => (p.disabled ? '#888' : '#000')};
  padding: 0.5rem 0;
  width: 100%;

  :focus {
    outline: none;
    border-bottom: 2px solid ${(p) => p.theme.primary};
  }
`

export const GridContainer = styled.div`
  display: grid;
  gap: 1.5rem;

  padding: 2rem 0.5rem;
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 20vh;
  max-height: 50vh;
  padding: 0.5rem 0;
  color: ${(p) => (p.disabled ? '#888' : '#000')};
  resize: none;

  :focus {
    outline: none;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const FileInputLabel = styled.label<{ disabled?: boolean }>`
  position: relative;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const GreyH3 = styled.h3`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 500;
  text-align: center;
`

export const Slide = styled.li<{ flexBasis: string }>`
  scroll-snap-align: center;

  aspect-ratio: 16 / 11;
  margin: 1.5rem;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  flex: 0 0 ${(p) => p.flexBasis};
  position: relative;
`

export const PreviewSlide = styled(Slide)`
  flex: 0 0 96%;
  padding: 0;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5rem;
    padding: 0.5rem;
  }
`

function getGroupIdFromQueryString() {
  return globalThis.location
    ? new URLSearchParams(globalThis.location.search).get('groupId') ?? ''
    : ''
}

export function resizeTextareaHeight(e: KeyboardEvent<HTMLTextAreaElement>) {
  const eventTarget = e.target as HTMLTextAreaElement
  eventTarget.style.height = 'auto'
  eventTarget.style.height = `${eventTarget.scrollHeight}px`
}

const description = '자유담에 글을 작성해보세요'

export default function PostCreationPage() {
  return (
    <PageHead title="글쓰기 - 자유담" description={description}>
      ㅁㄴㅇㄹ
    </PageHead>
  )
}
