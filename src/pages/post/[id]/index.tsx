import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import SharingPostButton from 'src/components/sharing-post/SharingPostButton'
import SharedPostCard from 'src/components/sharing-post/SharingPostCard'
import {
  Post,
  usePostQuery,
  useToggleLikingPostMutation,
} from 'src/graphql/generated/types-and-hooks'
import { LoginLink } from 'src/hooks/useNeedToLogin'
import Navigation from 'src/layouts/Navigation'
import { Skeleton, flexBetween, flexCenter } from 'src/styles'
import { theme } from 'src/styles/global'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import CommentIcon from 'src/svgs/CommentIcon'
import HeartIcon from 'src/svgs/HeartIcon'
import ShareIcon from 'src/svgs/ShareIcon'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
import { stopPropagation } from 'src/utils'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { borderRadiusCircle } from '..'

const description = ''

export default function PostPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  function goBack() {
    router.back()
  }

  const { name } = useRecoilValue(currentUser)

  // Post 불러오기
  const { data, loading } = usePostQuery({
    fetchPolicy: 'cache-and-network',
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  const parentPost = data?.post as Post
  const sharingPost = data?.post?.sharingPost as Post
  const author = parentPost?.author
  const parentAuthor = parentPost?.parentAuthor
  const comments = parentPost?.comments

  const title = `${author?.nickname ?? '사용자'}: ${
    parentPost?.content?.substring(0, 20) ?? '내용'
  } - 자유담`

  // 좋아요
  const [toggleLikingPostMutation, { loading: likeLoading }] = useToggleLikingPostMutation({
    onError: toastApolloError,
    variables: { id: postId },
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

  // 댓글 달기
  function showPostCreationModal(e: any) {
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
    <PageHead title={title} description={description}>
      <Navigation>
        <main>
          <Sticky>
            <BackArrowIcon onClick={goBack} />
            이야기
          </Sticky>
          <Grid>
            {loading ? (
              <div>post loading</div>
            ) : parentPost ? (
              <>
                <FlexCenter>
                  <Image
                    src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
                    alt="profile"
                    width="40"
                    height="40"
                    style={borderRadiusCircle}
                  />
                  <FlexBetween>
                    <div>
                      <Bold disabled={!author}>{author?.nickname ?? '탈퇴한 사용자'}</Bold>
                      {author && (
                        <LineLink href={`/@${author.name}`}>
                          <GreyH5>@{author.name}</GreyH5>
                        </LineLink>
                      )}
                    </div>
                    <ThreeDotsIcon width="1.5rem" />
                  </FlexBetween>
                </FlexCenter>
                {parentAuthor && author && parentAuthor.name !== author.name && (
                  <GreyInlineH5>
                    Replying to{' '}
                    <LineLink href={`/@${parentAuthor.name}`}>@{parentAuthor.name}</LineLink>
                  </GreyInlineH5>
                )}
                <p>
                  {parentPost.deletionTime
                    ? `${new Date(parentPost.deletionTime).toLocaleString()} 에 삭제된 글이에요`
                    : parentPost.content}
                </p>

                {sharingPost && <SharedPostCard sharedPost={sharingPost as Post} />}

                <div>
                  {new Date(parentPost.creationTime).toLocaleString()}{' '}
                  <span>{parentPost.updateTime && '(수정됨)'}</span>
                </div>
                <GridColumn4Center>
                  <div>
                    <Button
                      color={theme.error}
                      onClick={toggleLikingPost}
                      selected={parentPost.isLiked}
                    >
                      <HeartIcon /> <span>{parentPost.likeCount}</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      color={theme.primaryText}
                      onClick={showPostCreationModal}
                      selected={parentPost.doIComment}
                    >
                      <CommentIcon /> <span>{parentPost.commentCount}</span>
                    </Button>
                  </div>
                  <SharingPostButton post={parentPost} sharedPost={parentPost} />
                  <div>기타</div>
                </GridColumn4Center>
              </>
            ) : (
              <div>post not found</div>
            )}
          </Grid>

          {loading ? (
            <div>comments loading</div>
          ) : comments ? (
            comments.map((comment) => <CommentCard key={comment.id} comment={comment as Post} />)
          ) : (
            <div>comments not found</div>
          )}
        </main>
      </Navigation>
    </PageHead>
  )
}

type Props2 = {
  comment: Post
  showSharedPost?: boolean
}

export function CommentCard({ comment, showSharedPost }: Props2) {
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

export function PostLoadingCard() {
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
      <FlexColumn>
        <Image
          src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
          alt="profile"
          width="40"
          height="40"
          style={borderRadiusCircle}
        />
        {children?.[0]}
      </FlexColumn>
      <GridSmallGap onClick={goToPostPage}>
        <FlexBetween>
          <div>
            <Bold disabled={!author}>{author?.nickname ?? '탈퇴한 사용자'}</Bold>{' '}
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

export const Card = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;

  border: 1px solid ${(p) => p.theme.shadow};
  padding: 0.8rem 1rem;
`

const Sticky = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 1rem;

  svg {
    width: 3rem;
    padding: 0.5rem 1rem 0.5rem 0;
  }
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
`

export const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
  cursor: pointer;
`

const FlexBetween = styled.div`
  ${flexBetween}
  gap: 0.5rem;
  flex: 1;
  min-width: 0;

  > div {
    flex: 1;
    min-width: 0;
  }

  > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const FlexCenter = styled.div`
  ${flexCenter}
  gap: 0.5rem;
`

export const GreyH5 = styled.h5`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;
`

const GreyInlineH5 = styled(GreyH5)`
  display: inline-block;
`

const GridColumn4 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  > div {
    ${flexCenter}
    gap: 0.5rem;
  }
`

const GridColumn4Center = styled(GridColumn4)`
  > div {
    justify-content: center;
  }
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

const Bold = styled.b<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : '#000')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const LineLink = styled(Link)`
  :hover {
    > * {
      text-decoration: underline;
    }
  }
`

export const Button = styled.button<{ color: string; selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  > svg {
    width: 1rem;
    path {
      fill: ${(p) => (p.selected ? p.color : p.theme.primaryTextAchromatic)};
      transition: fill 0.3s ease;
    }
  }

  > span {
    color: ${(p) => (p.selected ? p.color : p.theme.primaryTextAchromatic)};
    transition: color 0.3s ease;
  }

  :hover {
    > svg {
      path {
        fill: ${(p) => p.color};
      }
    }

    > span {
      color: ${(p) => p.color};
    }
  }
`

const Width = styled.div`
  > svg {
    width: 1rem;
  }
`
