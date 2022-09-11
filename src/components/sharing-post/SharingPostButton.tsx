import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import {
  Post,
  useDeleteSharingPostMutation,
  useMyProfileQuery,
  useSharePostMutation,
} from '../../graphql/generated/types-and-hooks'
import { borderRadiusCircle } from '../../pages/post'
import { Button } from '../../pages/post/[id]'
import { SubmitButton } from '../../pages/register'
import { theme } from '../../styles/global'
import ShareIcon from '../../svgs/ShareIcon'
import { stopPropagation } from '../../utils'
import { TABLET_MIN_WIDTH } from '../../utils/constants'
import { currentUser } from '../../utils/recoil'
import { FlexColumn, GridCenterCenter } from '../atoms/Flex'
import LoginLink from '../atoms/LoginLink'
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

  const me = data?.myProfile

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
        <SmallForm as="form" onClick={stopPropagation}>
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

export const SmallForm = styled(FlexColumn)`
  gap: 1rem;

  background: ${(p) => p.theme.backgroud};
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-y: auto;
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

export const Grid1to1 = styled(GridCenterCenter)`
  grid-template-columns: 1fr 1fr;

  > button:last-child {
    color: ${(p) => p.theme.error};
  }
`
