import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import LoginLink from 'src/components/atoms/LoginLink'
import {
  Post,
  useDeleteSharingPostMutation,
  useMyProfileQuery,
  useSharePostMutation,
} from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { Button } from 'src/pages/post/[id]'
import { SubmitButton } from 'src/pages/register'
import { theme } from 'src/styles/global'
import ShareIcon from 'src/svgs/ShareIcon'
import { stopPropagation } from 'src/utils'
import { TABLET_MIN_WIDTH } from 'src/utils/constants'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import Modal from '../atoms/Modal'
import PostCreationModalForm from '../create-post/PostCreationModalForm'
import SharedPostCard from './SharingPostCard'

type Props2 = {
  post: Post
  sharedPost: Post
}

export default function SharingPostButton({ post, sharedPost }: Props2) {
  const { name } = useRecoilValue(currentUser)

  // Modal
  const [openSharingPostModal, setSharingPostModal] = useState(false)

  function openSharingModal(e: any) {
    e.stopPropagation()

    if (name) {
      if (post.doIShare) {
        setDeletingSharingPost(true)
      } else {
        setSharingPostModal(true)
      }
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  function closeSharingModal() {
    setSharingPostModal(false)
  }

  // 프로필 불러오기
  const { data } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data?.user

  // 이야기 공유
  const [sharePostMutation, { loading: shareLoading }] = useSharePostMutation({
    onCompleted: () => {
      toast.success('이야기 공유 완료')
      setSharingPostModal(false)
      setIsSubmitionSuccess(true)
    },
    onError: toastApolloError,
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

  function sharePost({ content }: any) {
    sharePostMutation({
      variables: {
        input: {
          content,
          sharingPostId: post.id,
        },
      },
    })
  }

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

  // 삭제
  const [openDeletingSharingPost, setDeletingSharingPost] = useState(false)

  const [deleteSharingPostMutation, { loading: deleteLoading }] = useDeleteSharingPostMutation({
    onCompleted: () => {
      setDeletingSharingPost(false)
    },
    onError: toastApolloError,
    update: (cache, { data }) =>
      data?.deleteSharingPost?.deletedPost?.deletionTime === null &&
      cache.evict({ id: `Post:${data.deleteSharingPost.deletedPost.id}` }),
    variables: { sharedPostId: post.id },
  })

  function deleteSharingPost() {
    deleteSharingPostMutation()
  }

  function closeDeletingSharingPost() {
    setDeletingSharingPost(false)
  }

  return (
    <>
      <Button color={theme.secondary} onClick={openSharingModal} selected={post.doIShare}>
        <ShareIcon /> <span>{post.sharedCount}</span>
      </Button>
      <Modal
        lazy
        open={openDeletingSharingPost}
        onClose={closeDeletingSharingPost}
        showCloseButton={false}
      >
        <SmallForm onClick={stopPropagation}>
          <h3>공유했던 글을 삭제할까요?</h3>
          <Grid1to1>
            <button disabled={deleteLoading} onClick={closeDeletingSharingPost}>
              취소
            </button>
            <button disabled={deleteLoading} onClick={deleteSharingPost} type="button">
              삭제
            </button>
          </Grid1to1>
        </SmallForm>
      </Modal>
      <Modal lazy open={openSharingPostModal} onClose={closeSharingModal} showCloseButton={false}>
        <PostCreationModalForm
          disabled={shareLoading}
          haveToReset={isSubmitionSuccess}
          onReset={() => setIsSubmitionSuccess(false)}
          onClose={closeSharingModal}
          onSubmit={sharePost}
        >
          <Image
            src={me?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="40"
            height="40"
            style={borderRadiusCircle}
          />
          <SharedPostCard sharedPost={sharedPost} />
        </PostCreationModalForm>
      </Modal>
    </>
  )
}

const SmallForm = styled.form`
  background: ${(p) => p.theme.backgroud};
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-y: auto;

  display: flex;
  flex-flow: column;
  gap: 1rem;
`

export const FullscreenForm = styled(SmallForm)`
  width: 100%;
  height: 100%;
  border-radius: 0;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    border-radius: 0.5rem;
    width: auto;
    height: auto;
    max-height: 90vh;
  }
`

export const Button0 = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
`

export const PrimaryButton = styled(SubmitButton)`
  border-radius: 999px;
  padding: 0.5rem 1rem;
  width: auto;
`

const Grid1to1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  align-items: center;

  > button:last-child {
    color: ${(p) => p.theme.error};
  }
`
