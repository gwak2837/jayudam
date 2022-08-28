import LoginLink from 'src/components/atoms/LoginLink'
import { gql } from '@apollo/client'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import {
  Post,
  useDeleteSharingPostMutation,
  useMeQuery,
  useSharePostMutation,
} from 'src/graphql/generated/types-and-hooks'
import { AutoTextarea_ as AutoTextarea, borderRadiusCircle } from 'src/pages/post'
import { Button } from 'src/pages/post/[id]'
import { SubmitButton } from 'src/pages/register'
import { flexBetween } from 'src/styles'
import { theme } from 'src/styles/global'
import ShareIcon from 'src/svgs/ShareIcon'
import XIcon from 'src/svgs/x.svg'
import { stopPropagation } from 'src/utils'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import Modal from '../atoms/Modal'
import SharedPostCard from './SharingPostCard'

type Props2 = {
  post: Post
  sharedPost: Post
}

export default function SharingPostButton({ post, sharedPost }: Props2) {
  const router = useRouter()
  const { name } = useRecoilValue(currentUser)

  // 생성
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

  const { data } = useMeQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      content: '',
    },
  })

  const [sharePostMutation, { loading: shareLoading }] = useSharePostMutation({
    onCompleted: () => {
      toast.success('이야기 공유 완료')
      setSharingPostModal(false)
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
    <div>
      <Button color={theme.secondary} onClick={openSharingModal} selected={post.doIShare}>
        <ShareIcon /> <span>{post.sharedCount}</span>
      </Button>
      <Modal
        lazy
        open={openDeletingSharingPost}
        onClose={closeDeletingSharingPost}
        showCloseButton={false}
      >
        <SmallModal onClick={stopPropagation}>
          <h3>공유했던 글을 삭제할까요?</h3>
          <Grid1to1>
            <button onClick={closeDeletingSharingPost}>취소</button>
            <button onClick={deleteSharingPost} type="button">
              삭제
            </button>
          </Grid1to1>
        </SmallModal>
      </Modal>
      <Modal lazy open={openSharingPostModal} onClose={closeSharingModal} showCloseButton={false}>
        <ModalOrFullscreen onClick={stopPropagation} onSubmit={handleSubmit(sharePost)}>
          <FlexBetweenCenter>
            <Button0>
              <XIcon width="40px" onClick={closeSharingModal} />
            </Button0>
            <PrimaryButton disabled={errors && Object.keys(errors).length !== 0} type="submit">
              글쓰기
            </PrimaryButton>
          </FlexBetweenCenter>
          <Flex>
            <Image
              src={data?.user?.imageUrl ?? '/images/shortcut-icon.webp'}
              alt="profile"
              width="40"
              height="40"
              style={borderRadiusCircle}
            />
            <AutoTextarea
              autoFocus
              disabled={shareLoading}
              onInput={resizeTextareaHeight}
              onKeyDown={submitWhenCmdEnter}
              placeholder="Add content"
              {...register('content', {
                maxLength: 200,
              })}
            />
          </Flex>
          <SharedPostCard sharedPost={sharedPost} />
        </ModalOrFullscreen>
      </Modal>
    </div>
  )
}

const SmallModal = styled.form`
  background: ${(p) => p.theme.backgroud};
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-y: auto;

  display: flex;
  flex-flow: column;
  gap: 1rem;
`

export const ModalOrFullscreen = styled(SmallModal)`
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

export const FlexBetweenCenter = styled.div`
  ${flexBetween}
  align-items: center;
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

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
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
