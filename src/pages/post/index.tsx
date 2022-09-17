import { ApolloCache } from '@apollo/client'
import Image from 'next/future/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../../apollo/error'
import PostCreationButton from '../../components/create-post/PostCreationButton'
import { PostCreation, PostCreationForm } from '../../components/create-post/PostCreationForm'
import PageHead from '../../components/PageHead'
import PostCard, { PostLoadingCard } from '../../components/PostCard'
import PostDrawer from '../../components/PostDrawer'
import {
  Post,
  useCreatePostMutation,
  useMyProfileQuery,
  usePostsQuery,
} from '../../graphql/generated/types-and-hooks'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import Navigation from '../../layouts/Navigation'
import { Skeleton } from '../../styles'
import { uploadFormDataFiles } from '../../utils/fetch'
import { currentUser } from '../../utils/recoil'

export default function PostsPage() {
  const { name } = useRecoilValue(currentUser)

  // 이야기 불러오기
  const {
    data,
    loading: isPostLoading,
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
  const { data: data2, loading: isProfileLoading } = useMyProfileQuery({
    onError: toastApolloError,
    skip: !name,
  })

  const me = data2?.myProfile

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
  const [createPostMutation] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('이야기 생성 완료')
      setIsSubmitionSuccess(true)
      setIsPostCreating(false)
    },
    onError: toastApolloError,
    update: addNewPost,
  })

  const [isSubmitionSuccess, setIsSubmitionSuccess] = useState(false)
  const [isPostCreating, setIsPostCreating] = useState(false)

  async function createPost({ content, formData }: PostCreation) {
    setIsPostCreating(true)

    createPostMutation({
      variables: {
        input: {
          content,
          ...(formData &&
            Array.from(formData.keys()).length > 0 && {
              imageUrls: (await uploadFormDataFiles(formData)).map((info: any) => info.url),
            }),
        },
      },
    })
  }

  return (
    <PageHead title="이야기 - 자유담" description="자유담에서 이야기를 나눠보세요">
      <Navigation>
        <main>
          <Sticky>
            <SmallNormalH1>이야기</SmallNormalH1>
            <PostCreationButton show={showButton} />
          </Sticky>

          <PostCreationForm
            disabled={isPostCreating}
            haveToReset={isSubmitionSuccess}
            onReset={() => setIsSubmitionSuccess(false)}
            onSubmit={createPost}
            postCreationRef={postCreationRef}
          >
            {isProfileLoading ? (
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

          <PostDrawer />

          {posts
            ? posts.map((post) => <PostCard key={post.id} post={post as Post} showSharedPost />)
            : !isPostLoading && <div>posts not found</div>}

          {isPostLoading && (
            <>
              <PostLoadingCard />
              <PostLoadingCard />
              <PostLoadingCard />
            </>
          )}

          {!isPostLoading &&
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
