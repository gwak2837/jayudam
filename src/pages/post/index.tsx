import { ApolloCache } from '@apollo/client'
import Image from 'next/future/image'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import CommentCard, { PostLoadingCard } from 'src/components/CommentCard'
import PostCreationButton from 'src/components/create-post/PostCreationButton'
import { PostCreationForm } from 'src/components/create-post/PostCreationForm'
import PageHead from 'src/components/PageHead'
import {
  Post,
  useCreatePostMutation,
  useMyProfileQuery,
  usePostsQuery,
} from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import Navigation from 'src/layouts/Navigation'
import { Skeleton } from 'src/styles'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

export default function PostsPage() {
  const { name } = useRecoilValue(currentUser)

  // 이야기 불러오기
  const {
    data,
    loading: postLoading,
    fetchMore,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    onError: toastApolloError,
  })

  const posts = data?.posts

  const [hasMoreData, setHasMoreData] = useState(true)

  const infiniteScrollRef = useInfiniteScroll({
    hasMoreData,
    onIntersecting: async () =>
      posts &&
      posts.length > 0 &&
      fetchMore({
        variables: {
          lastId: posts[posts.length - 1].id,
        },
      })
        .then((response) => response.data.posts?.length !== 20 && setHasMoreData(false))
        .catch(() => setHasMoreData(false)),
  })

  // 프로필 사진 불러오기
  const { data: data2, loading: profileLoading } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data2?.user

  // 이야기 생성 Intersection Observer
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

  // 이야기 생성
  const [createPostMutation, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('이야기 생성 완료')
      setIsSubmitionSuccess(true)
    },
    onError: toastApolloError,
    update: addNewPost,
  })

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)

  function createPost({ content }: any) {
    createPostMutation({
      variables: {
        input: { content },
      },
    })
  }

  return (
    <PageHead title="이야기 - 자유담" description="">
      <Navigation>
        <main>
          <Sticky>
            <SmallNormalH1>이야기</SmallNormalH1>
            <PostCreationButton show={showButton} />
          </Sticky>

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

          {posts
            ? posts.map((post) => (
                <CommentCard key={post.id} comment={post as Post} showSharedPost />
              ))
            : !postLoading && <div>posts not found</div>}

          {postLoading && (
            <>
              <PostLoadingCard />
              <PostLoadingCard />
              <PostLoadingCard />
            </>
          )}

          {!postLoading &&
            (hasMoreData ? (
              <div ref={infiniteScrollRef}>
                <PostLoadingCard />
              </div>
            ) : (
              <div>모든 게시글을 불러왔어요</div>
            ))}
        </main>
      </Navigation>
    </PageHead>
  )
}

export const Sticky = styled.header`
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

  > svg {
    path,
    rect {
      fill: ${(p) => p.theme.primary};
    }
  }
`

const SmallNormalH1 = styled.h1`
  font-size: 1rem;
  font-weight: 400;
`

export const borderRadiusCircle = { borderRadius: '50%' }

function addNewPost(cache: ApolloCache<any>, { data }: any) {
  return (
    data &&
    cache.modify({
      fields: {
        posts: () => {
          // return [{ __ref: `Post:${data.createPost?.newPost.id}` }, ...existingPosts]
        },
      },
    })
  )
}
