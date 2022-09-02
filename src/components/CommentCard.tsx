import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, ReactNode, MouseEvent } from 'react'
import { toastApolloError } from 'src/apollo/error'
import { Post, useToggleLikingPostMutation } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { LineLink, Button, GridColumn4, GreyInlineH5, Bold } from 'src/pages/post/[id]'
import { Skeleton } from 'src/styles'
import { theme } from 'src/styles/global'
import CommentIcon from 'src/svgs/CommentIcon'
import HeartIcon from 'src/svgs/HeartIcon'
import ShareIcon from 'src/svgs/ShareIcon'
import { stopPropagation } from 'src/utils'
import styled from 'styled-components'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
import SharingPostButton from './sharing-post/SharingPostButton'
import SharedPostCard from './sharing-post/SharingPostCard'
import { FlexBetween, GridSmallGap as GridSmallGap_ } from './atoms/Flex'

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
    toggleLikingPostMutation()
  }

  // 댓글 달기
  function showPostCreationModal(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      <FlexColumn onClick={goToPostPage}>
        <Image
          src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
          alt="profile"
          width="40"
          height="40"
          onClick={goToUserPage}
          style={borderRadiusCircle}
        />
        {children?.[0]}
      </FlexColumn>
      <GridSmallGap onClick={goToPostPage}>
        <FlexBetween>
          <div>
            <Bold disabled={!author} onClick={goToUserPage}>
              {author?.nickname ?? '탈퇴한 사용자'}
            </Bold>{' '}
            {author && (
              <LineLink href={`/@${author.name}`} onClick={stopPropagation}>
                <GreyInlineH5>@{author.name}</GreyInlineH5>
              </LineLink>
            )}
            {' · '}
            <span>{new Date(comment.creationTime).toLocaleDateString()}</span>
            <span>{comment.updateTime && '(수정됨)'}</span>
          </div>
          <ThreeDotsIcon width="1rem" />
        </FlexBetween>

        {showParentAuthor && parentAuthor && author && parentAuthor.name !== author.name && (
          <GreyInlineH5>
            Replying to{' '}
            <Link href={`/@${parentAuthor.name}`} onClick={stopPropagation}>
              @{parentAuthor.name}
            </Link>
          </GreyInlineH5>
        )}

        <p>
          {comment.deletionTime
            ? `${new Date(comment.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : comment.content}
        </p>

        {showSharedPost && sharedPost && <SharedPostCard sharedPost={sharedPost as Post} />}

        <GridColumn4>
          <div>
            <Button color={theme.error} onClick={toggleLikingPost} selected={comment.isLiked}>
              <HeartIcon /> <span>{comment.likeCount}</span>
            </Button>
          </div>
          <div>
            <Button
              color={theme.primaryText}
              onClick={showPostCreationModal}
              selected={comment.doIComment}
            >
              <CommentIcon /> <span>{comment.commentCount}</span>
            </Button>
          </div>
          <SharingPostButton post={comment} sharedPost={comment} />
          <div>기타</div>
        </GridColumn4>
      </GridSmallGap>

      {children?.[1]}
    </>
  )
}

export const PostLoadingCard = memo(PostLoadingCard_)

function PostLoadingCard_() {
  return (
    <Card>
      <FlexColumn>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
      </FlexColumn>
      <GridSmallGap>
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
      </GridSmallGap>
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

const FlexColumn = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`

const VerticalLine = styled.div`
  border-left: 1px solid #888;
  margin: auto;
  flex-grow: 1;
`

const Width = styled.div`
  > svg {
    width: 1rem;
  }
`

const GridSmallGap = styled(GridSmallGap_)`
  cursor: pointer;
`
