import Image from 'next/future/image'
import { useRouter } from 'next/router'
import React from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostQuery } from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
import styled from 'styled-components'

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
      title={`${parentPost?.author?.nickname ?? '사용자'} - 자유담`}
      description={description}
    >
      <Navigation>
        <Sticky>
          <BackArrowIcon />
          이야기
        </Sticky>
        <Grid>
          {parentPost ? (
            <>
              <Flex>
                <Image
                  src={parentPost.author?.imageUrl ?? '/images/shortcut-icon.webp'}
                  alt="profile"
                  width="40"
                  height="40"
                  style={{ borderRadius: '50%' }}
                />
                <FlexBetween>
                  <div>
                    <div>{parentPost.author?.nickname ?? '탈퇴한 사용자'}</div>
                    <GreySmallText>@{parentPost.author?.name}</GreySmallText>
                  </div>
                  <ThreeDotsIcon />
                </FlexBetween>
              </Flex>
              <p>
                {parentPost.deletionTime
                  ? `${new Date(parentPost.deletionTime).toLocaleString()} 에 삭제된 글이에요`
                  : parentPost.content}
              </p>
              <div>
                {new Date(parentPost.creationTime).toLocaleString()}{' '}
                <span>{parentPost.updateTime && '(수정됨)'}</span>
              </div>
              <GridColumn4>
                <div>좋아요 {parentPost.likeCount}</div>
                <div>댓글 {parentPost.commentCount}</div>
                <div>공유 {parentPost.sharedCount}</div>
                <div>기타</div>
              </GridColumn4>
            </>
          ) : (
            <div>loading</div>
          )}
        </Grid>
        <pre style={{ margin: 0, overflow: 'auto' }}>
          {JSON.stringify(parentPost?.comments, null, 2)}
        </pre>
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

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;

  > svg {
    width: 1.5rem;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const GreySmallText = styled.h5`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;
`

const GridColumn4 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
`
