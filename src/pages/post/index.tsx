import Image from 'next/future/image'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import CreatingPostButton from 'src/components/create-post/CreatingPostButton'
import PageHead from 'src/components/PageHead'
import { Post, useMyProfileQuery, usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import useInfiniteScroll from 'src/hooks/useInfiniteScroll'
import Navigation from 'src/layouts/Navigation'
import { Skeleton } from 'src/styles'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { CommentCard } from './[id]'

export default function PostsPage() {
  const { name } = useRecoilValue(currentUser)

  // 이야기 불러오기
  const {
    data,
    loading: postLoading,
    fetchMore,
  } = usePostsQuery({ onError: toastApolloError, variables: { limit } })

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
  const postCreationRef = useRef<HTMLTextAreaElement>(null)

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

  return (
    <PageHead title="이야기 - 자유담" description="">
      <Navigation>
        <main>
          <Sticky>
            <Flex>
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
              <div>이야기</div>
            </Flex>
            <CreatingPostButton show={showButton} />
          </Sticky>
          <textarea ref={postCreationRef} />

          {posts
            ? posts.map((post) => (
                <CommentCard key={post.id} comment={post as Post} showSharedPost />
              ))
            : !postLoading && <div>posts not found</div>}

          {postLoading && <div>이야기 불러오는 중</div>}

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

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const borderRadiusCircle = { borderRadius: '50%' }
