import { useRouter } from 'next/router'
import Image from 'next/future/image'
import React from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostQuery } from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import styled from 'styled-components'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'

const description = ''

export default function PostPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  const { data, loading } = usePostQuery({
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  const parentPost = data?.post

  return (
    <PageHead
      title={`${parentPost?.author?.nickname ?? '이름'} - 자유담`}
      description={description}
    >
      <Navigation>
        <Sticky>
          <BackArrowIcon />
          이야기
        </Sticky>
        <Padding>
          <FlexBetween>
            <Image
              src={parentPost?.author?.imageUrl ?? '/images/shortcut-icon.webp'}
              alt="profile"
              // fill
              sizes="100vw"
            />
            <div>
              <span>{parentPost?.author?.nickname}</span>
              <span>{parentPost?.author?.name}</span>
            </div>
            <ThreeDotsIcon />
          </FlexBetween>
        </Padding>
        <pre style={{ margin: 0, overflow: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>
      </Navigation>
    </PageHead>
  )
}

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

const Padding = styled.div`
  padding: 1rem;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;

  > svg {
    width: 2rem;
  }
`
