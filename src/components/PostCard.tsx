import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { MouseEvent, ReactNode, memo, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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
import { FlexBetween, FlexCenter, FlexColumn, GrayText, GridGap, Grid as Grid_ } from './atoms/Flex'
import LoginLink from './atoms/LoginLink'
import CommentCreationButton from './create-post/CommentCreationButton'
import { postDrawer } from './PostDrawer'
import SharingPostButton from './sharing-post/SharingPostButton'
import SharedPostCard, { GreyH5, OverflowAuto, TextOverflow } from './sharing-post/SharingPostCard'

type Props2 = {
  haveToScroll?: boolean
  post: Post
  showButtons?: boolean
  showSharedPost?: boolean
  showVerticalLine?: boolean
}

export default memo(PostCard)

function PostCard({
  haveToScroll,
  post,
  showButtons = true,
  showSharedPost,
  showVerticalLine,
}: Props2) {
  const comments = post.comments

  const postRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (haveToScroll && postRef.current) {
      window.scrollTo(0, postRef.current.scrollHeight)
    }
  }, [haveToScroll])

  return (
    <Card as="li" ref={postRef}>
      <PostContent
        post={post}
        showParentAuthor
        showButtons={showButtons}
        showSharedPost={showSharedPost}
      >
        {showVerticalLine || comments ? <VerticalLine /> : null}
        {comments?.map((comment, i) => (
          <PostContent key={comment.id} post={comment}>
            {[comments?.length - 1 !== i && <VerticalLine key={i} />]}
          </PostContent>
        ))}
      </PostContent>
    </Card>
  )
}

type Props = {
  children?: ReactNode[]
  post: Post
  showButtons?: boolean
  showParentAuthor?: boolean
  showSharedPost?: boolean
}

function PostContent({ children, post, showButtons, showParentAuthor, showSharedPost }: Props) {
  const author = post.author
  const parentAuthor = post.parentPost?.author
  const sharedPost = post.sharingPost
  const imageUrls = post.imageUrls

  const { name } = useRecoilValue(currentUser)

  // 해당 글로 이동하기
  const router = useRouter()

  function goToPostPage() {
    router.push(`/post/${post.id}`)
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
    variables: { id: post.id },
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

  // 이야기 Drawer
  const setPostDrawer = useSetRecoilState(postDrawer)

  function openDrawer_setPostDrawerContent(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()
    setPostDrawer({ isOpened: true, post })
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
              <GrayText>
                {post.creationTime && new Date(post.creationTime).toLocaleDateString()}
              </GrayText>
              <GrayText>{post.updateTime && '(수정됨)'}</GrayText>
            </TextOverflow>
          </FlexCenterGap>
          <button onClick={openDrawer_setPostDrawerContent}>
            <ThreeDotsIcon width="1rem" />
          </button>
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
          {post.deletionTime
            ? `${new Date(post.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : applyLineBreak(post.content)}
        </p>

        <PostImages imageUrls={imageUrls} />

        {showSharedPost && sharedPost && <SharedPostCard sharedPost={sharedPost as Post} />}

        {showButtons && (
          <GridColumn4>
            <div>
              <Button
                color={theme.error}
                disabled={loading}
                onClick={toggleLikingPost}
                selected={post.isLiked}
              >
                <HeartIcon /> <span>{post.likeCount}</span>
              </Button>
            </div>
            <div>
              <CommentCreationButton parentPost={post} />
            </div>
            <div>
              <SharingPostButton post={post} sharedPost={post} />
            </div>
            <div>기타</div>
          </GridColumn4>
        )}
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

type Props3 = {
  imageUrls?: string[] | null
}

export function PostImages({ imageUrls }: Props3) {
  return imageUrls ? (
    imageUrls.length == 1 ? (
      <KeepRatioImage src={imageUrls[0]} alt={imageUrls[0]} width="500" height="500" />
    ) : imageUrls.length == 2 ? (
      <Grid2>
        {imageUrls.map((imageUrl, i) => (
          <SquareFrame key={i}>
            <CoverImage src={imageUrl} alt={imageUrl} fill />
          </SquareFrame>
        ))}
      </Grid2>
    ) : imageUrls.length == 3 ? (
      <Grid4>
        {imageUrls.map((imageUrl, i) => (
          <SquareFrame key={i} i={i}>
            <CoverImage src={imageUrl} alt={imageUrl} fill />
          </SquareFrame>
        ))}
      </Grid4>
    ) : imageUrls.length >= 4 ? (
      <Grid4>
        {imageUrls.map((imageUrl, i) => (
          <SquareFrame key={i}>
            <CoverImage src={imageUrl} alt={imageUrl} fill />
          </SquareFrame>
        ))}
      </Grid4>
    ) : null
  ) : null
}

export const Card = styled(GridGap)`
  grid-template-columns: auto 1fr;

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

const KeepRatioImage = styled(Image)`
  border: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
  border-radius: 0.5rem;
  width: 100%;
  height: auto;
`

const GridGapPointer = styled(GridGap)`
  cursor: pointer;
`

const FlexCenterGap = styled(FlexCenter)`
  gap: 0 0.5rem;
  min-width: 0;
  flex-flow: row wrap;
`

const Grid2 = styled(Grid_)`
  grid-template-columns: 1fr 1fr;
  gap: 0.2rem;

  aspect-ratio: 16 / 9;
  border: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
`

const Grid4 = styled(Grid2)`
  grid-template-rows: 1fr 1fr;
`

const SquareFrame = styled.div<{ i?: number }>`
  position: relative;
  ${(p) => p.i === 0 && 'grid-row: span 2;'}
`

const CoverImage = styled(Image)`
  object-fit: cover;
`
