import { gql } from '@apollo/client'
import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useCreatePostMutation, useMyProfileQuery } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import QuillPenIcon from 'src/svgs/quill-pen.svg'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import LoginLink from '../atoms/LoginLink'
import Modal from '../atoms/Modal'
import PostCreationModalForm from './PostCreationModalForm'

type Props = {
  show: boolean
}

export default function PostCreationButton({ show }: Props) {
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

  // 프로필 불러오기
  const { data } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data?.user

  // 이야기 생성하기
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
        <PostCreationModalForm
          disabled={createLoading}
          onClose={closeSharingModal}
          onSubmit={createPost}
        >
          <Image
            src={me?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="40"
            height="40"
            style={borderRadiusCircle}
          />
          <div />
        </PostCreationModalForm>
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
