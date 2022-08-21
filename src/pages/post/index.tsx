import Image from 'next/future/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { Post, useMyProfileQuery, usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { CommentCard } from './[id]'

export default function PostsPage() {
  const { name } = useRecoilValue(currentUser)

  // 이야기 불러오기
  const { data, loading } = usePostsQuery({ onError: toastApolloError })

  const posts = data?.posts

  // 프로필 사진 불러오기
  const { data: data2, loading: profileLoading } = useMyProfileQuery({
    fetchPolicy: 'cache-and-network',
    onError: toastApolloError,
    skip: !name,
  })

  // 이야기 생성 Intersection Observer
  const postCreationRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (postCreationRef.current) {
      const postCreationIntersect = new IntersectionObserver((entries, observer) => {
        console.log('👀 - entries, observer', entries, observer)
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
            {profileLoading ? (
              <div>프로필 불러오는 중</div>
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
          </Sticky>
          <textarea ref={postCreationRef} />
          {loading ? (
            <div>이야기 불러오는 중</div>
          ) : posts ? (
            posts.map((post) => <CommentCard key={post.id} comment={post as Post} showSharedPost />)
          ) : (
            <div>posts not found</div>
          )}
        </main>
      </Navigation>
    </PageHead>
  )
}

const Sticky = styled.header`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  gap: 1rem;

  background: #ffffffdd;
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
`

export const borderRadiusCircle = { borderRadius: '50%' }
