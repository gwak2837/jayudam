import { ApolloCache } from '@apollo/client'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useRef, useState, MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../../apollo/error'
import {
  FlexBetween,
  FlexCenter,
  FlexColumn,
  GrayText,
  GridBigGap,
  GridSmallGap,
} from '../../../components/atoms/Flex'
import LoginLink from '../../../components/atoms/LoginLink'
import PostCard, { PostLoadingCard, Width } from '../../../components/PostCard'
import CommentCreationButton from '../../../components/create-post/CommentCreationButton'
import PostCreationButton from '../../../components/create-post/PostCreationButton'
import { PostCreationForm } from '../../../components/create-post/PostCreationForm'
import PageHead from '../../../components/PageHead'
import SharingPostButton from '../../../components/sharing-post/SharingPostButton'
import SharedPostCard, {
  GreyH5,
  TextOverflow,
} from '../../../components/sharing-post/SharingPostCard'
import {
  Post,
  useCommentsQuery,
  useCreateCommentMutation,
  useDeletePostMutation,
  useMyProfileQuery,
  usePostQuery,
  useToggleLikingPostMutation,
} from '../../../graphql/generated/types-and-hooks'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import Navigation from '../../../layouts/Navigation'
import { Skeleton, flexCenter } from '../../../styles'
import { theme } from '../../../styles/global'
import BackArrowIcon from '../../../svgs/back-arrow.svg'
import CommentIcon from '../../../svgs/CommentIcon'
import HeartIcon from '../../../svgs/HeartIcon'
import ShareIcon from '../../../svgs/ShareIcon'
import ThreeDotsIcon from '../../../svgs/three-dots.svg'
import { stopPropagation } from '../../../utils'
import { currentUser } from '../../../utils/recoil'
import { borderRadiusCircle } from '..'
import Drawer from '../../../components/atoms/Drawer'
import DrawerPostContent from '../../../components/delete-post/DrawerPostContent'

const description = '자유담에서 이야기해보세요'

export default function PostPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string
  const didDelete = useRef(false)

  function goBack() {
    router.back()
  }

  const { name } = useRecoilValue(currentUser)

  // Post 불러오기
  const { data, loading } = usePostQuery({
    fetchPolicy: 'cache-and-network',
    onError: toastApolloError,
    skip: !postId || didDelete.current,
    variables: { id: postId },
  })

  const post = data?.post as Post
  const sharingPost = data?.post?.sharingPost as Post
  const author = post?.author
  const parentPost = post?.parentPost
  const parentAuthor = parentPost?.author

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

  // 댓글 생성 Intersection Observer
  const postCreationRef = useRef<HTMLFormElement>(null)

  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (postCreationRef.current) {
      const postCreationIntersect = new IntersectionObserver((entries) => {
        setShowButton(!entries[0].isIntersecting)
      })

      postCreationIntersect.observe(postCreationRef.current)

      return () => {
        postCreationIntersect.disconnect()
      }
    }
  }, [])

  // Drawer
  const [isDrawerOpened, setIsDrawerOpened] = useState(false)

  const [drawerContent, setDrawerContent] = useState<ReactNode>()

  function openDrawer(e: MouseEvent<HTMLElement>, content: ReactNode) {
    e.stopPropagation()
    setIsDrawerOpened(true)
    setDrawerContent(content)
  }

  function closeDrawer() {
    setIsDrawerOpened(false)
  }

  // 삭제
  const [deletePostMutation, { loading: deleteLoading }] = useDeletePostMutation({
    onCompleted: () => {
      setIsDrawerOpened(false)
      toast.success('이야기 삭제 완료')
      didDelete.current = true
      router.back()
    },
    onError: toastApolloError,
    update: (cache, { data }) =>
      data?.deletePost?.deletionTime === null && cache.evict({ id: `Post:${data.deletePost.id}` }),
    variables: { id: post?.id },
  })

  function startOpeningDrawer(e: any) {
    openDrawer(
      e,
      <DrawerPostContent loading={deleteLoading} onDelete={deletePostMutation} post={post} />
    )
  }

  // 기타
  const title = `${author?.nickname ?? '글쓴이'}: ${
    post?.content?.substring(0, 20) ?? '내용'
  } - 자유담`

  return (
    <PageHead title={title} description={description}>
      <Navigation>
        <main>
          <Sticky>
            <FlexCenterSamllGap>
              <BackArrowIcon width="1.5rem" onClick={goBack} />
              이야기
            </FlexCenterSamllGap>
            <PostCreationButton show={showButton} />
          </Sticky>

          <Drawer open={isDrawerOpened} onClose={closeDrawer}>
            {drawerContent}
          </Drawer>

          {parentPost && (
            <>
              <PostCard
                haveToScroll
                onCloseDrawer={closeDrawer}
                onOpenDrawer={openDrawer}
                post={parentPost}
                showButtons={false}
                showVerticalLine
              />
              <Padding />
            </>
          )}

          {!postId || loading ? (
            <Grid>
              <FlexCenterSamllGap>
                <Skeleton width="40px" height="40px" borderRadius="50%" />
                <FlexBetweenGap>
                  <GridSmallGap>
                    <Skeleton width="50%" />
                    <Skeleton width="30%" />
                  </GridSmallGap>
                  <ThreeDotsIcon width="1.5rem" />
                </FlexBetweenGap>
              </FlexCenterSamllGap>

              <GridSmallGap>
                <Skeleton />
                <Skeleton width="80%" />
                <Skeleton width="50%" />
              </GridSmallGap>

              {sharingPost && <SharedPostCard sharedPost={sharingPost as Post} />}

              <Skeleton width="30%" />

              <GridColumn4Center>
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
              </GridColumn4Center>
            </Grid>
          ) : (
            post && (
              <Grid>
                <FlexCenterSamllGap>
                  <Image
                    src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
                    alt="profile"
                    width="40"
                    height="40"
                    style={borderRadiusCircle}
                  />
                  <FlexBetweenGap>
                    <FlexColumnSmallGap>
                      <TextOverflow>
                        <Bold disabled={!author}>{author?.nickname ?? '탈퇴한 사용자'}</Bold>
                      </TextOverflow>
                      {author && (
                        <LineLink href={`/@${author.name}`}>
                          <GreyH5>@{author.name}</GreyH5>
                        </LineLink>
                      )}
                    </FlexColumnSmallGap>
                    <button onClick={startOpeningDrawer}>
                      <ThreeDotsIcon width="1.5rem" />
                    </button>
                  </FlexBetweenGap>
                </FlexCenterSamllGap>

                {parentAuthor && author && parentAuthor.name !== author.name && (
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
                    : post.content}
                </p>

                {sharingPost && <SharedPostCard sharedPost={sharingPost as Post} />}

                <GrayText>
                  {new Date(post.creationTime).toLocaleString()}{' '}
                  <span>{post.updateTime && '(수정됨)'}</span>
                </GrayText>

                <GridColumn4Center>
                  <div>
                    <Button
                      color={theme.error}
                      disabled={likeLoading}
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
                </GridColumn4Center>
              </Grid>
            )
          )}

          {postId && !loading && !post && (
            <Relative>
              <Image src="/images/no-post.jpg" alt="no post" fill />
              <CenterH2>No Post</CenterH2>
            </Relative>
          )}

          <Comments
            onCloseDrawer={closeDrawer}
            onOpenDrawer={openDrawer}
            postCreationRef={postCreationRef}
          />
        </main>
      </Navigation>
    </PageHead>
  )
}

function Comments({ onCloseDrawer, onOpenDrawer, postCreationRef }: any) {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string
  const { name } = useRecoilValue(currentUser)

  // 댓글 불러오기 (무한 스크롤 페이지네이션)
  const [hasMoreData, setHasMoreData] = useState(true)

  const { data, loading, fetchMore } = useCommentsQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ comments }) => (!comments || comments.length === 0) && setHasMoreData(false),
    onError: toastApolloError,
    skip: !postId,
    variables: { parentId: postId, limit },
  })

  const comments = data?.comments

  const infiniteScrollRef = useInfiniteScroll({
    hasMoreData,
    onIntersecting: async () =>
      comments &&
      comments.length > 0 &&
      fetchMore({
        variables: {
          lastId: comments[comments.length - 1].id,
        },
      })
        .then((response) => response.data.comments?.length !== limit && setHasMoreData(false))
        .catch(() => setHasMoreData(false)),
  })

  // 프로필 불러오기
  const { data: data2, loading: profileLoading } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data2?.myProfile

  // 댓글 생성
  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

  const [createPostMutation, { loading: createLoading }] = useCreateCommentMutation({
    onCompleted: () => {
      toast.success('댓글 생성 완료')
      setIsSubmitionSuccess(true)
      setHasMoreData(true)
    },
    onError: toastApolloError,
    update: addNewComment,
  })

  function createPost({ content }: any) {
    createPostMutation({
      variables: {
        input: {
          content,
          parentPostId: postId,
        },
      },
    })
  }

  return (
    <>
      <PostCreationForm
        disabled={createLoading}
        haveToReset={isSubmitionSuccess}
        onReset={() => setIsSubmitionSuccess(false)}
        onSubmit={createPost}
        postCreationRef={postCreationRef}
      >
        {profileLoading ? (
          <Skeleton width="32px" height="32px" borderRadius="50%" />
        ) : (
          <Image
            src={me?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="32"
            height="32"
            style={borderRadiusCircle}
          />
        )}
      </PostCreationForm>

      <MinHeight>
        {comments?.map((comment) => (
          <PostCard
            key={comment.id}
            onCloseDrawer={onCloseDrawer}
            onOpenDrawer={onOpenDrawer}
            post={comment as Post}
          />
        ))}

        {(!postId || loading) && (
          <>
            <PostLoadingCard />
            <PostLoadingCard />
          </>
        )}

        {!comments && postId && !loading && (
          <Relative>
            <Image src="/images/no-comment.jpg" alt="no post" fill />
            <CenterH2>No Comment</CenterH2>
          </Relative>
        )}
      </MinHeight>

      {!loading &&
        (hasMoreData ? (
          <CenterText ref={infiniteScrollRef}>무한 스크롤</CenterText>
        ) : (
          comments && <CenterText>모든 댓글을 불러왔어요</CenterText>
        ))}
    </>
  )
}

const limit = process.env.NODE_ENV === 'production' ? 20 : 2

const Sticky = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  background: #fff;
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
`

const Grid = styled(GridBigGap)`
  padding: 0 1rem 1rem;
`

const FlexBetweenGap = styled(FlexBetween)`
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

export const GreyInlineH5 = styled.h5`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;
  display: inline-block;
`

const FlexCenterSamllGap = styled(FlexCenter)`
  gap: 0 0.5rem;
  min-width: 0;
`

const FlexColumnSmallGap = styled(FlexColumn)`
  gap: 0 0.5rem;
  min-width: 0;
`

export const GridColumn4 = styled.div`
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

export const Bold = styled.b<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : '#000')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

export const LineLink = styled(Link)`
  :hover {
    > * {
      text-decoration: underline;
    }
  }
`

export const Button = styled.button<{ color?: string; selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
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

export function addNewComment(cache: ApolloCache<any>, { data }: any) {
  if (!data) return

  const newPost = {
    __ref: `Post:${data.createPost?.newPost.id}`,
  }

  return cache.modify({
    broadcast: false,
    fields: {
      comments: (existingPosts) => (existingPosts ? [newPost, ...existingPosts] : [newPost]),
      posts: (existingPosts) => (existingPosts ? [newPost, ...existingPosts] : [newPost]),
    },
  })
}

const Relative = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
`

const CenterH2 = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;
`

const Padding = styled.div`
  padding-top: 1rem;
`

const MinHeight = styled.ul`
  min-height: max(50vh, 300px);
`

const CenterText = styled.div`
  font-size: 0.9rem;
  text-align: center;
`
