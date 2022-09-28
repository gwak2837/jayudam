import Image from 'next/future/image'
import { ChangeEvent, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { theme } from '../../styles/global'
import ImageIcon from '../../svgs/image.svg'
import XCircleIcon from '../../svgs/x-circle.svg'
import { resizeTextareaHeight, submitWhenCmdEnter } from '../../utils/react'
import { currentUser } from '../../utils/recoil'
import { AutoTextarea_ } from '../atoms/AutoTextarea'
import {
  Absolute,
  FlexBetweenCenter,
  FlexBigGap,
  FlexCenter,
  FlexCenterBigGap,
  FlexGap as FlexGap_,
} from '../atoms/Flex'
import LoginLink from '../atoms/LoginLink'
import { Card } from '../PostCard'
import { PrimaryButton } from '../sharing-post/SharingPostButton'

type Props = {
  children: ReactNode
  disabled: boolean
  haveToReset: boolean
  onReset: any
  onSubmit: any
  postCreationRef: RefObject<HTMLFormElement>
}

type ImageInfo = {
  id: number
  name: string
  url: string
}

export type PostCreation = {
  content: string
  formData: FormData | null
}

export function PostCreationForm({
  children,
  disabled,
  haveToReset,
  onReset,
  onSubmit,
  postCreationRef,
}: Props) {
  // 로그인 상태
  const { name } = useRecoilValue(currentUser)

  function needLogin() {
    if (!name) {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  // 새로운 이야기 입력값
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<PostCreation>({
    defaultValues: {
      content: '',
      formData: globalThis.FormData ? new FormData() : null,
    },
  })

  const contentLength = watch('content').length

  // Image upload
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([])
  const imageId = useRef(0)

  function createPreviewImages(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (files && files.length > 0) {
      const newImageInfos: ImageInfo[] = []

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          toast.warn(
            <div>
              이미지만 가능합니다.
              <h6>{file.name}</h6>
            </div>
          )
          continue
        }

        if (file.size > 10_000_000) {
          toast.warn(
            <div>
              10 MB 이하만 가능합니다.
              <h6>{file.name}</h6>
            </div>
          )
          continue
        }

        newImageInfos.push({
          id: imageId.current,
          name: file.name,
          url: URL.createObjectURL(file),
        })
        getValues('formData')!.append(`image-${imageId.current}`, file)
        imageId.current++
      }

      setImageInfos((prev) => [...prev, ...newImageInfos])
    }
  }

  function deletePreviewImage(imageId: number) {
    const formData = getValues('formData')
    if (formData) {
      formData.delete(`image-${imageId}`)
      setImageInfos((prevList) => prevList.filter((prev) => prev.id !== imageId))
    }
  }

  // 기타
  useEffect(() => {
    if (haveToReset) {
      reset()
      onReset()
      setImageInfos([])
    }
  }, [haveToReset, onReset, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={postCreationRef}>
      <Card onClick={needLogin}>
        {children}
        <GridSmallGap>
          <AutoTextarea
            disabled={!name || disabled}
            onInput={resizeTextareaHeight}
            onKeyDown={submitWhenCmdEnter}
            placeholder="Add content"
            {...register('content')}
          />

          <FlexGap>
            {imageInfos.map((imageInfo) => (
              <SquareFrame key={imageInfo.id}>
                <Image src={imageInfo.url} alt={imageInfo.name} fill />
                <AbsoluteTopRight as="button" onClick={() => deletePreviewImage(imageInfo.id)}>
                  <XCircleIcon width="1rem" />
                </AbsoluteTopRight>
              </SquareFrame>
            ))}
          </FlexGap>

          <FlexBetweenCenter>
            <FlexCenterBigGap>
              <PrimaryOrError error={contentLength > 200}>{contentLength}</PrimaryOrError>
              <FlexCenter as="label">
                <ImageIcon cursor="pointer" width="1.5rem" fill={theme.primaryText} />
                <FileInput
                  accept="image/*"
                  disabled={!name || disabled}
                  multiple
                  onChange={createPreviewImages}
                  type="file"
                />
              </FlexCenter>
            </FlexCenterBigGap>
            <PrimaryButton
              disabled={
                !name ||
                contentLength === 0 ||
                contentLength > 200 ||
                disabled ||
                Object.keys(errors).length !== 0
              }
              type="submit"
            >
              글쓰기
            </PrimaryButton>
          </FlexBetweenCenter>
        </GridSmallGap>
      </Card>
    </form>
  )
}

const AutoTextarea = styled(AutoTextarea_)`
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'text')};
  max-height: 50vh;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const PrimaryOrError = styled.span<{ error: boolean }>`
  color: ${(p) => (p.error ? p.theme.error : p.theme.primaryText)};
  height: 1.6rem;
`

const FileInput = styled.input`
  display: none;
`

const FlexGap = styled(FlexGap_)`
  overflow-x: auto;
  min-width: 0;
`

export const SquareFrame = styled.div`
  aspect-ratio: 1 / 1;
  position: relative;

  > img {
    object-fit: cover;
  }
`

const AbsoluteTopRight = styled(Absolute)`
  top: 0;
  right: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  padding: 0.5rem;
`
