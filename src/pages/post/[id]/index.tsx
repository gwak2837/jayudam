import { ApolloCache } from '@apollo/client'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import LoginLink from 'src/components/atoms/LoginLink'
import CommentCard, { PostLoadingCard } from 'src/components/CommentCard'
import CommentCreationButton from 'src/components/create-post/CommentCreationButton'
import PostCreationButton from 'src/components/create-post/PostCreationButton'
import { PostCreationForm } from 'src/components/create-post/PostCreationForm'
import PageHead from 'src/components/PageHead'
import SharingPostButton from 'src/components/sharing-post/SharingPostButton'
import SharedPostCard from 'src/components/sharing-post/SharingPostCard'
import {
  Post,
  useCommentsQuery,
  useCreateCommentMutation,
  useMyProfileQuery,
  usePostQuery,
  useToggleLikingPostMutation,
} from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import Navigation from 'src/layouts/Navigation'
import { Skeleton, flexBetween, flexCenter } from 'src/styles'
import { theme } from 'src/styles/global'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import HeartIcon from 'src/svgs/HeartIcon'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
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

  const post = data?.post as Post
  const sharingPost = data?.post?.sharingPost as Post
  const author = post?.author
  const parentAuthor = post?.parentAuthor

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

  // 기타
  const title = `${author?.nickname ?? '글쓴이'}: ${
    post?.content?.substring(0, 20) ?? '내용'
  } - 자유담`

  return (
    <PageHead title={title} description={description}>
      <Navigation>
        <main>
          <Sticky>
            <FlexCenter>
              <BackArrowIcon width="1.5rem" onClick={goBack} />
              이야기
            </FlexCenter>
            <PostCreationButton show={showButton} />
          </Sticky>
          <Grid>
            {!postId || loading ? (
              <div>post loading</div>
            ) : post ? (
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
                  {post.deletionTime
                    ? `${new Date(post.deletionTime).toLocaleString()} 에 삭제된 글이에요`
                    : post.content}
                </p>

                {sharingPost && <SharedPostCard sharedPost={sharingPost as Post} />}

                <div>
                  {new Date(post.creationTime).toLocaleString()}{' '}
                  <span>{post.updateTime && '(수정됨)'}</span>
                </div>
                <GridColumn4Center>
                  <div>
                    <Button color={theme.error} onClick={toggleLikingPost} selected={post.isLiked}>
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
              </>
            ) : (
              <div>post not found</div>
            )}
          </Grid>

          <Comments postCreationRef={postCreationRef} />
        </main>
      </Navigation>
    </PageHead>
  )
}

function Comments({ postCreationRef }: any) {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string
  const { name } = useRecoilValue(currentUser)

  // 댓글 불러오기
  const { data, loading, fetchMore } = useCommentsQuery({
    notifyOnNetworkStatusChange: true,
    onError: toastApolloError,
    skip: !postId,
    variables: { parentId: postId },
  })

  const comments = data?.comments

  const [hasMoreData, setHasMoreData] = useState(true)

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
        .then((response) => response.data.comments?.length !== 20 && setHasMoreData(false))
        .catch(() => setHasMoreData(false)),
  })

  // 프로필 불러오기
  const { data: data2, loading: profileLoading } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data2?.user

  // 댓글 생성
  const [createPostMutation, { loading: createLoading }] = useCreateCommentMutation({
    onCompleted: () => {
      toast.success('댓글 생성 완료')
      setIsSubmitionSuccess(true)
    },
    onError: toastApolloError,
    update: addNewComment,
  })

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

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

      {comments
        ? comments.map((comment) => <CommentCard key={comment.id} comment={comment as Post} />)
        : !loading && <div>comments not found</div>}

      {loading && (
        <>
          <PostLoadingCard />
          <PostLoadingCard />
          <PostLoadingCard />
        </>
      )}

      {!loading && hasMoreData ? (
        <div ref={infiniteScrollRef}>무한 스크롤</div>
      ) : (
        <div>모든 댓글을 불러왔어요</div>
      )}
    </>
  )
}

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

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
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

export const GreyInlineH5 = styled(GreyH5)`
  display: inline-block;
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

export function addNewComment(cache: ApolloCache<any>, { data }: any) {
  if (!data) return

  const newPost = {
    id: data.createPost?.newPost.id,
    __typename: 'Post',
  }

  return cache.modify({
    fields: {
      comments: (existingPosts = []) => [...existingPosts, newPost],
      posts: (existingPosts = []) => [newPost, ...existingPosts],
    },
  })
}
