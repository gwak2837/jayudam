import { gql } from '@apollo/client'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useCreatePostMutation, useMeQuery } from 'src/graphql/generated/types-and-hooks'
import { AutoTextarea_ as AutoTextarea, borderRadiusCircle } from 'src/pages/post'
import QuillPenIcon from 'src/svgs/quill-pen.svg'
import XIcon from 'src/svgs/x.svg'
import { stopPropagation } from 'src/utils'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import LoginLink from '../atoms/LoginLink'
import Modal from '../atoms/Modal'
import {
  Button0,
  FlexBetweenCenter,
  ModalOrFullscreen,
  PrimaryButton,
} from '../sharing-post/SharingPostButton'

type Props = {
  show: boolean
}

export default function CreatingPostButton({ show }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Modal
  const [openCreatingPostModal, setOpenCreatingPostModal] = useState(false)

  function openCreatingModal() {
    if (name) {
      setOpenCreatingPostModal(true)
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  function closeSharingModal() {
    setOpenCreatingPostModal(false)
  }

  // 이야기 생성
  const { data: data3 } = useMeQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      content: '',
    },
  })

  const contentLength = watch('content').length

  const [createPostMutation, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('이야기 생성 완료')
      setOpenCreatingPostModal(false)
    },
    onError: toastApolloError,
    update: (cache, { data }) =>
      data &&
      cache.modify({
        fields: {
          posts: (existingPosts = []) => {
            return [
              cache.readFragment({
                id: `Post:${data.createPost?.newPost.id}`,
                fragment: gql`
                  fragment NewPost on Post {
                    id
                  }
                `,
              }),
              ...existingPosts,
            ]
          },
        },
      }),
  })

  function createPost({ content }: any) {
    createPostMutation({
      variables: {
        input: { content },
      },
    })
  }

  return (
    <>
      <Button show={show} onClick={openCreatingModal}>
        <QuillPenIcon width="32" />
      </Button>
      <Modal lazy open={openCreatingPostModal} onClose={closeSharingModal} showCloseButton={false}>
        <ModalOrFullscreen onClick={stopPropagation} onSubmit={handleSubmit(createPost)}>
          <FlexBetweenCenter>
            <Button0>
              <XIcon width="40px" onClick={closeSharingModal} />
            </Button0>
            <PrimaryButton
              disabled={contentLength === 0 || Object.keys(errors).length !== 0}
              type="submit"
            >
              글쓰기
            </PrimaryButton>
          </FlexBetweenCenter>
          <Flex>
            <Image
              src={data3?.user?.imageUrl ?? '/images/shortcut-icon.webp'}
              alt="profile"
              width="40"
              height="40"
              style={borderRadiusCircle}
            />
            <AutoTextarea
              autoFocus
              disabled={createLoading}
              onInput={resizeTextareaHeight}
              onKeyDown={submitWhenCmdEnter}
              placeholder="Add content"
              {...register('content', {
                required: true,
                minLength: 1,
                maxLength: 200,
              })}
            />
          </Flex>
        </ModalOrFullscreen>
      </Modal>
    </>
  )
}

const Button = styled.button<{ show: boolean }>`
  display: flex;
  align-items: center;

  background: ${(p) => p.theme.primaryBackground};
  border-radius: 50%;
  opacity: ${(p) => (p.show ? '1' : '0')};
  padding: 5px;
  transition: visibility 0.2s ease-out, opacity 0.2s ease-out;
  visibility: ${(p) => (p.show ? 'visible' : 'hidden')};
`

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`
