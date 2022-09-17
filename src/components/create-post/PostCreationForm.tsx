import Image from 'next/future/image'
import { ChangeEvent, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import {
  CreatePostMutationVariables,
  PostCreationInput,
} from '../../graphql/generated/types-and-hooks'
import { theme } from '../../styles/global'
import ImageIcon from '../../svgs/image.svg'
import { resizeTextareaHeight, submitWhenCmdEnter } from '../../utils/react'
import { currentUser } from '../../utils/recoil'
import { AutoTextarea_ } from '../atoms/AutoTextarea'
import { FlexBetweenCenter, FlexCenter, FlexCenterGap } from '../atoms/Flex'
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

export type ImageInfo = {
  id: number
  name: string
  url: string
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
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      content: '',
      formData: new FormData(),
    },
  })

  const contentLength = watch('content').length

  useEffect(() => {
    if (haveToReset) {
      reset()
      onReset()
    }
  }, [haveToReset, onReset, reset])

  // Image upload
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([])
  const imageId = useRef(0)
  const formData = useRef(globalThis.FormData ? new FormData() : null)
  const [postCreationLoading, setPostCreationLoading] = useState(false)

  function createPreviewImages(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files

    if (files && files.length > 0 && formData.current) {
      const newImageInfos: ImageInfo[] = []

      for (const file of files) {
        if (file.type.startsWith('image/')) {
          newImageInfos.push({
            id: imageId.current,
            name: file.name,
            url: URL.createObjectURL(file),
          })
          formData.current.append(`image-${imageId.current}`, file)
          imageId.current++
        }
      }

      setImageInfos((prev) => [...prev, ...newImageInfos])
    }
  }

  function deletePreviewImage(imageId: number) {
    if (formData.current) {
      formData.current.delete(`image${imageId}`)
      setImageInfos((prevList) => prevList.filter((prev) => prev.id !== imageId))
    }
  }

  // async function createPost(input: PostCreationInput) {
  //   setPostCreationLoading(true)
  //   const variables: CreatePostMutationVariables = { input }

  //   if (formData.current) {
  //     const files = [...formData.current.values()]

  //     if (files.length > 0) {
  //       const newFormData = new FormData()
  //       for (const file of files) {
  //         newFormData.append('images', file)
  //       }

  //       const { imageUrls } = await uploadImageFiles(newFormData)
  //       variables.input.imageUrls = imageUrls
  //     }
  //   }

  //   await createPostMutation({ variables })
  //   setPostCreationLoading(false)
  // }

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
          {imageInfos.map((imageInfo) => (
            <Image
              key={imageInfo.id}
              src={imageInfo.url}
              alt={imageInfo.name}
              width="200"
              height="200"
            />
          ))}
          <FlexBetweenCenter>
            <FlexCenterGap>
              <PrimaryOrError error={contentLength > 200}>{contentLength}</PrimaryOrError>
              <FlexCenter as="label">
                <ImageIcon width="1.5rem" fill={theme.primaryText} />
                <FileInput
                  accept="image/*"
                  disabled={!name || disabled}
                  // id="images"
                  multiple
                  onChange={createPreviewImages}
                  type="file"
                />
              </FlexCenter>
            </FlexCenterGap>
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

function getGroupIdFromQueryString() {
  return globalThis.location
    ? new URLSearchParams(globalThis.location.search).get('groupId') ?? ''
    : ''
}

const AutoTextarea = styled(AutoTextarea_)`
  max-height: 50vh;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const PrimaryOrError = styled.span<{ error: boolean }>`
  color: ${(p) => (p.error ? p.theme.error : p.theme.primaryText)};
  height: 1.6rem;
  /* height: 100%; */
`

const FileInput = styled.input`
  display: none;
`
