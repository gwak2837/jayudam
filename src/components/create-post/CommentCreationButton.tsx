import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useCreatePostMutation, useMyProfileQuery } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { Button, addNewComment } from 'src/pages/post/[id]'
import { theme } from 'src/styles/global'
import CommentIcon from 'src/svgs/CommentIcon'
import { applyLineBreak } from 'src/utils/react'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { FlexColumn as FlexColumn_, Flex as Flex_, GridSmallGap } from '../atoms/Flex'
import LoginLink from '../atoms/LoginLink'
import Modal from '../atoms/Modal'
import { VerticalLine } from '../CommentCard'
import PostCreationModalForm from './PostCreationModalForm'

type Props = {
  parentPost: any
}

export default function CommentCreationButton({ parentPost }: Props) {
  const { name } = useRecoilValue(currentUser)

  const parentAuthor = parentPost.author

  // Modal
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openCreatingCommentModal(e: any) {
    e.preventDefault()
    e.stopPropagation()

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

  function closeCreatingCommentModal() {
    setIsModalOpened(false)
  }

  // 프로필 불러오기
  const { data } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data?.user

  // 댓글 생성하기
  const [createCommentMutation, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('댓글 생성 완료')
      setIsModalOpened(false)
      setIsSubmitionSuccess(true)
    },
    onError: toastApolloError,
    update: addNewComment,
  })

  function createPost({ content }: any) {
    createCommentMutation({
      variables: {
        input: {
          content,
          parentPostId: parentPost.id,
        },
      },
    })
  }

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

  return (
    <>
      <Button
        color={theme.primaryText}
        onClick={openCreatingCommentModal}
        selected={parentPost.doIComment}
      >
        <CommentIcon /> <span>{parentPost.commentCount}</span>
      </Button>
      <Modal lazy open={isModalOpened} onClose={closeCreatingCommentModal} showCloseButton={false}>
        <PostCreationModalForm
          disabled={createLoading}
          haveToReset={isSubmitionSuccess}
          onReset={() => setIsSubmitionSuccess(false)}
          onClose={closeCreatingCommentModal}
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
          <Flex>
            <FlexColumn>
              <Image
                src={parentAuthor?.imageUrl ?? '/images/shortcut-icon.webp'}
                alt="profile"
                width="40"
                height="40"
                style={borderRadiusCircle}
              />
              <VerticalLine />
            </FlexColumn>
            <div>
              <GridSmallGap>
                <div>
                  <h4>{parentAuthor?.nickname}</h4>
                  <span>@{parentAuthor?.name}</span>
                  <span>{parentPost?.creationTime}</span>
                </div>
                <p>{applyLineBreak(parentPost.content)}</p>
                <span>Replying to @{parentAuthor?.name}</span>
              </GridSmallGap>
            </div>
          </Flex>
        </PostCreationModalForm>
      </Modal>
    </>
  )
}

const Flex = styled(Flex_)`
  gap: 0.5rem;
`

const FlexColumn = styled(FlexColumn_)`
  gap: 0.5rem;
`
