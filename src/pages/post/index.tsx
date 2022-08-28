import { gql } from '@apollo/client'
import Image from 'next/future/image'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import CreatingPostButton from 'src/components/create-post/CreatingPostButton'
import PageHead from 'src/components/PageHead'
import { PrimaryButton } from 'src/components/sharing-post/SharingPostButton'
import {
  Post,
  useCreatePostMutation,
  useMyProfileQuery,
  usePostsQuery,
} from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import Navigation from 'src/layouts/Navigation'
import { FlexBetween_, Skeleton } from 'src/styles'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from 'src/utils/constants'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { Card, CommentCard, PostLoadingCard } from './[id]'

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
    variables: { limit },
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
          limit,
        },
      })
        .then((response) => response.data.posts?.length !== limit && setHasMoreData(false))
        .catch(() => setHasMoreData(false)),
  })

  // 프로필 사진 불러오기
  const { data: data2, loading: profileLoading } = useMyProfileQuery({
    fetchPolicy: 'cache-and-network',
    onError: toastApolloError,
    skip: !name,
  })

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
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm({
    defaultValues: {
      content: '',
    },
  })

  const contentLength = watch('content').length

  const [createPostMutation, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('이야기 생성 완료')
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
            <CreatingPostButton show={showButton} />
          </Sticky>

          <form onSubmit={handleSubmit(createPost)} ref={postCreationRef}>
            <Card>
              {profileLoading ? (
                <Skeleton width="32px" height="32px" borderRadius="50%" />
              ) : (
                <Image
                  src={data2?.user?.imageUrl ?? '/images/shortcut-icon.webp'}
                  alt="profile"
                  width="32"
                  height="32"
                  style={borderRadiusCircle}
                />
              )}

              <GridSmallGap>
                <AutoTextarea
                  disabled={createLoading}
                  onInput={resizeTextareaHeight}
                  onKeyDown={submitWhenCmdEnter}
                  placeholder="Add content"
                  {...register('content')}
                />
                <FlexBetweenCenter>
                  <Error error={contentLength > 200}>{contentLength}</Error>
                  <PrimaryButton
                    disabled={
                      contentLength === 0 ||
                      contentLength > 200 ||
                      createLoading ||
                      Object.keys(errors).length !== 0
                    }
                    type="submit"
                  >
                    글쓰기
                  </PrimaryButton>
                </FlexBetweenCenter>
              </GridSmallGap>
            </Card>
          </form>

          <PostLoadingCard />
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

          {!postLoading && hasMoreData && <div ref={infiniteScrollRef}>무한 스크롤</div>}
          {!hasMoreData && <div>모든 게시글을 불러왔어요</div>}
        </main>
      </Navigation>
    </PageHead>
  )
}

const limit = 20

const Sticky = styled.header`
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  background: #ffffffdd;
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

export const AutoTextarea_ = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 2.5rem;
  max-height: 80vh;
  padding: 0.5rem;
  resize: vertical;

  flex: 1;

  :focus {
    outline: none;
  }

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
  }
`

const AutoTextarea = styled(AutoTextarea_)`
  max-height: 50vh;
`

const FlexBetweenCenter = styled(FlexBetween_)`
  align-items: center;
`

const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

const Error = styled.span<{ error: boolean }>`
  color: ${(p) => (p.error ? p.theme.error : p.theme.primaryText)};
`

export const borderRadiusCircle = { borderRadius: '50%' }
