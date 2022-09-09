import Image from 'next/future/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import {
  Post,
  useCreatePostMutation,
  useMyProfileQuery,
} from '../../graphql/generated/types-and-hooks'
import { borderRadiusCircle } from '../../pages/post'
import { Button, LineLink, addNewComment } from '../../pages/post/[id]'
import { theme } from '../../styles/global'
import CommentIcon from '../../svgs/CommentIcon'
import { stopPropagation } from '../../utils'
import { applyLineBreak } from '../../utils/react'
import { currentUser } from '../../utils/recoil'
import { FlexCenter, FlexColumn, Flex as Flex_, GrayText, GridGap } from '../atoms/Flex'
import LoginLink from '../atoms/LoginLink'
import Modal from '../atoms/Modal'
import { VerticalLine } from '../CommentCard'
import { TextOverflow } from '../sharing-post/SharingPostCard'
import PostCreationModalForm from './PostCreationModalForm'

type Props = {
  parentPost: Post
}

export default function CommentCreationButton({ parentPost }: Props) {
  const { name } = useRecoilValue(currentUser)

  const parentAuthor = parentPost.author

  // Modal
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openCreatingCommentModal(e: any) {
    e.preventDefault()
    e.stopPropagation()

    if (parentPost.deletionTime) {
      toast.warn('댓글을 달 수 없습니다')
    } else if (name) {
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

  const me = data?.myProfile

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

  function createComment({ content }: any) {
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

  if (parentPost.deletionTime)
    return (
      <Button disabled={true} onClick={openCreatingCommentModal}>
        <CommentIcon /> <span>{parentPost.commentCount}</span>
      </Button>
    )

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
          onSubmit={createComment}
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
            <FlexColumnGap>
              <Image
                src={parentAuthor?.imageUrl ?? '/images/shortcut-icon.webp'}
                alt="profile"
                width="40"
                height="40"
                style={borderRadiusCircle}
              />
              <VerticalLine />
            </FlexColumnGap>

            <GridGap>
              <FlexCenterGap>
                {parentAuthor ? (
                  <>
                    <TextOverflow as="h4">{parentAuthor.nickname}</TextOverflow>
                    <TextOverflow as="span">@{parentAuthor.name}</TextOverflow>
                  </>
                ) : (
                  <GrayText>탈퇴한 사용자</GrayText>
                )}
                <TextOverflow>
                  <span>{new Date(parentPost.creationTime).toLocaleDateString()}</span>
                  <span>{parentPost.updateTime && '(수정됨)'}</span>
                </TextOverflow>
              </FlexCenterGap>

              <p>{applyLineBreak(parentPost.content)}</p>

              {parentAuthor && (
                <TextOverflow>
                  <GrayText>Replying to </GrayText>
                  <LineLink href={`/@${parentAuthor.name}`} onClick={stopPropagation}>
                    @{parentAuthor.name}
                  </LineLink>
                </TextOverflow>
              )}
            </GridGap>
          </Flex>
        </PostCreationModalForm>
      </Modal>
    </>
  )
}

const Flex = styled(Flex_)`
  gap: 0.5rem;
`

const FlexColumnGap = styled(FlexColumn)`
  gap: 0.5rem;
`

const FlexCenterGap = styled(FlexCenter)`
  gap: 0 0.5rem;
  min-width: 0;
  flex-flow: row wrap;
`
