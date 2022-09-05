import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { MouseEvent, ReactNode, memo } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../apollo/error'
import { Post, useToggleLikingPostMutation } from '../graphql/generated/types-and-hooks'
import { borderRadiusCircle } from '../pages/post'
import { Bold, Button, GridColumn4, LineLink } from '../pages/post/[id]'
import { Skeleton } from '../styles'
import { theme } from '../styles/global'
import CommentIcon from '../svgs/CommentIcon'
import HeartIcon from '../svgs/HeartIcon'
import ShareIcon from '../svgs/ShareIcon'
import ThreeDotsIcon from '../svgs/three-dots.svg'
import { stopPropagation } from '../utils'
import { applyLineBreak } from '../utils/react'
import { currentUser } from '../utils/recoil'
import { FlexBetween, FlexCenter, FlexColumn, GrayText, GridGap } from './atoms/Flex'
import LoginLink from './atoms/LoginLink'
import CommentCreationButton from './create-post/CommentCreationButton'
import SharingPostButton from './sharing-post/SharingPostButton'
import SharedPostCard, { GreyH5, OverflowAuto, TextOverflow } from './sharing-post/SharingPostCard'

type Props2 = {
  comment: Post
  showSharedPost?: boolean
}

export default memo(CommentCard)

function CommentCard({ comment, showSharedPost }: Props2) {
  const comments = comment.comments

  return (
    <Card>
      <CommentContent comment={comment} showParentAuthor showSharedPost={showSharedPost}>
        {comments && <VerticalLine />}
        {comments?.map((comment, i) => (
          <CommentContent key={comment.id} comment={comment}>
            {[comments?.length - 1 !== i && <VerticalLine key={i} />]}
          </CommentContent>
        ))}
      </CommentContent>
    </Card>
  )
}

type Props = {
  children?: ReactNode[]
  comment: Post
  showParentAuthor?: boolean
  showSharedPost?: boolean
}

function CommentContent({ children, comment, showParentAuthor, showSharedPost }: Props) {
  const author = comment.author
  const parentAuthor = comment.parentAuthor
  const sharedPost = comment.sharingPost

  const { name } = useRecoilValue(currentUser)

  // 해당 글로 이동하기
  const router = useRouter()

  function goToPostPage() {
    router.push(`/post/${comment.id}`)
  }

  function goToUserPage(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()

    if (author) {
      router.push(`/@${author.name}`)
    }
  }

  // 좋아요
  const [toggleLikingPostMutation, { loading }] = useToggleLikingPostMutation({
    onError: toastApolloError,
    variables: { id: comment.id },
  })

  function toggleLikingPost(e: any) {
    e.preventDefault()
    e.stopPropagation()

    if (name) {
      toggleLikingPostMutation()
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  return (
    <>
      <FlexColumnGap onClick={goToPostPage}>
        <Image
          src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
          alt="profile"
          width="40"
          height="40"
          onClick={goToUserPage}
          style={borderRadiusCircle}
        />
        {children?.[0]}
      </FlexColumnGap>

      <GridGapPointer onClick={goToPostPage}>
        <FlexBetweenGap>
          <FlexCenterGap>
            <TextOverflow>
              <Bold disabled={!author} onClick={goToUserPage}>
                {author?.nickname ?? '탈퇴한 사용자'}
              </Bold>
            </TextOverflow>
            {author && (
              <OverflowAuto>
                <LineLink href={`/@${author.name}`} onClick={stopPropagation}>
                  <GreyH5> @{author.name}</GreyH5>
                </LineLink>
              </OverflowAuto>
            )}
            <TextOverflow>
              <GrayText>{new Date(comment.creationTime).toLocaleDateString()}</GrayText>
              <GrayText>{comment.updateTime && '(수정됨)'}</GrayText>
            </TextOverflow>
          </FlexCenterGap>
          <ThreeDotsIcon width="1rem" />
        </FlexBetweenGap>

        {showParentAuthor && parentAuthor && author && parentAuthor.name !== author.name && (
          <TextOverflow>
            <GrayText>Replying to </GrayText>
            <LineLink href={`/@${parentAuthor.name}`} onClick={stopPropagation}>
              @{parentAuthor.name}
            </LineLink>
          </TextOverflow>
        )}

        <p>
          {comment.deletionTime
            ? `${new Date(comment.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : applyLineBreak(comment.content)}
        </p>

        {showSharedPost && sharedPost && <SharedPostCard sharedPost={sharedPost as Post} />}

        <GridColumn4>
          <div>
            <Button
              color={theme.error}
              disabled={loading}
              onClick={toggleLikingPost}
              selected={comment.isLiked}
            >
              <HeartIcon /> <span>{comment.likeCount}</span>
            </Button>
          </div>
          <div>
            <CommentCreationButton parentPost={comment} />
          </div>
          <div>
            <SharingPostButton post={comment} sharedPost={comment} />
          </div>
          <div>기타</div>
        </GridColumn4>
      </GridGapPointer>

      {children?.[1]}
    </>
  )
}

export const PostLoadingCard = memo(PostLoadingCard_)

function PostLoadingCard_() {
  return (
    <Card>
      <FlexColumnGap>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
      </FlexColumnGap>
      <GridGapPointer>
        <Skeleton width="40%" />
        <Skeleton />
        <Skeleton width="80%" />
        <GridColumn4>
          <Width>
            <HeartIcon /> <Skeleton width="1rem" />
          </Width>
          <Width>
            <CommentIcon /> <Skeleton width="1rem" />
          </Width>
          <Width>
            <ShareIcon /> <Skeleton width="1rem" />
          </Width>
          <div>기타</div>
        </GridColumn4>
      </GridGapPointer>
    </Card>
  )
}

export const Card = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;

  border: 1px solid ${(p) => p.theme.shadow};
  padding: 0.8rem 1rem;
`

const FlexColumnGap = styled(FlexColumn)`
  gap: 0.5rem;
`

const FlexBetweenGap = styled(FlexBetween)`
  gap: 1rem;
  min-width: 0;

  > svg {
    flex-shrink: 0;
  }
`

export const VerticalLine = styled.div`
  border-left: 2px solid #888;
  margin: auto;
  flex-grow: 1;
`

export const Width = styled.div`
  > svg {
    width: 1rem;
  }
`

const GridGapPointer = styled(GridGap)`
  cursor: pointer;
`

const FlexCenterGap = styled(FlexCenter)`
  gap: 0 0.5rem;
  min-width: 0;
  flex-flow: row wrap;
`
