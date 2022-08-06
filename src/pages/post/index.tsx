import Link from 'next/link'
import React from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostsQuery } from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import styled from 'styled-components'

export default function PostsPage() {
  const { data, loading } = usePostsQuery({ onError: toastApolloError })

  const posts = data?.posts

  return (
    <PageHead title="이야기 - 자유담" description="">
      <Navigation>
        {loading ? (
          <div>이야기 불러오는 중</div>
        ) : posts ? (
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <pre style={{ overflow: 'auto', margin: 0 }}>{JSON.stringify(post, null, 2)}</pre>
            </Link>
          ))
        ) : (
          <div>posts not found</div>
        )}
      </Navigation>
    </PageHead>
  )
}

export const PrimaryH3 = styled.h3`
  color: ${(p) => p.theme.primary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
`

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.primary)};
  box-shadow: 0px 4px 20px rgba(16, 16, 16, 0.25);
  border-radius: 99px;
  color: #fff;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const limit = 10
