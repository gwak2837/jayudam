import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastError } from '../../apollo/error'
import { useCreatePostMutation, useMyProfileQuery } from '../../graphql/generated/types-and-hooks'
import { borderRadiusCircle } from '../../pages/post'
import QuillPenIcon from '../../svgs/quill-pen.svg'
import { currentUser } from '../../utils/recoil'
import LoginLink from '../atoms/LoginLink'
import Modal from '../atoms/Modal'
import PostCreationModalForm from './PostCreationModalForm'

type Props = {
  show: boolean
}

export default function PostCreationButton({ show }: Props) {
  const { name } = useRecoilValue(currentUser)

  // Modal
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openCreatingPostModal() {
    if (name) {
      setIsModalOpened(true)
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  function closeCreatingPostModal() {
    setIsModalOpened(false)
  }

  // 프로필 불러오기
  const { data } = useMyProfileQuery({
    onError: toastError,
    skip: !name,
  })

  const me = data?.myProfile

  // 이야기 생성하기
  const [createPostMutation, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('이야기 생성 완료')
      setIsModalOpened(false)
      setIsSubmitionSuccess(true)
    },
    onError: toastError,
    update: (cache, { data }) =>
      data &&
      cache.modify({
        fields: {
          posts: (existingPosts = []) => [
            {
              id: data.createPost?.newPost.id,
              __typename: 'Post',
            },
            ...existingPosts,
          ],
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

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

  return (
    <>
      <Button show={show} onClick={openCreatingPostModal}>
        <QuillPenIcon width="32" />
      </Button>
      <Modal lazy open={isModalOpened} onClose={closeCreatingPostModal} showCloseButton={false}>
        <PostCreationModalForm
          disabled={createLoading}
          haveToReset={isSubmitionSuccess}
          onClose={closeCreatingPostModal}
          onReset={() => setIsSubmitionSuccess(false)}
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
