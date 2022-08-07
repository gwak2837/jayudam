import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import {
  Post,
  usePostQuery,
  useToggleLikingPostMutation,
} from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import HeartIcon from 'src/svgs/HeartIcon'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
import styled from 'styled-components'

const description = ''

export default function PostPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  function goBack() {
    router.back()
  }

  // Post 불러오기
  const { data, loading } = usePostQuery({
    fetchPolicy: 'cache-and-network',
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  const parentPost = data?.post
  const sharingPost = data?.post?.sharingPost
  const author = parentPost?.author
  const parentAuthor = parentPost?.parentAuthor
  const comments = parentPost?.comments

  const title = `${author?.nickname ?? '사용자'}: ${
    parentPost?.content?.substring(0, 20) ?? '내용'
  } - 자유담`

  // 좋아요
  const [toggleLikingPostMutation, { loading: likeLoading }] = useToggleLikingPostMutation({
    onError: toastApolloError,
    variables: { id: postId },
  })

  function toggleLikingPost(e: any) {
    e.preventDefault()
    e.stopPropagation()
    toggleLikingPostMutation()
  }

  return (
    <PageHead title={title} description={description}>
      <Navigation>
        <Sticky>
          <BackArrowIcon onClick={goBack} />
          이야기
        </Sticky>
        <Grid>
          {loading ? (
            <div>post loading</div>
          ) : parentPost ? (
            <>
              <Flex>
                <Image
                  src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
                  alt="profile"
                  width="40"
                  height="40"
                  style={BorderRadius}
                />
                <FlexBetween>
                  <div>
                    <div>{author?.nickname ?? '탈퇴한 사용자'}</div>
                    <GreyH5>@{author?.name}</GreyH5>
                  </div>
                  <ThreeDotsIcon />
                </FlexBetween>
              </Flex>
              {parentAuthor && author && parentAuthor.name !== author.name && (
                <GreyInlineH5>
                  Replying to <Link href={`/@${parentAuthor.name}`}>@{parentAuthor.name}</Link>
                </GreyInlineH5>
              )}
              <p>
                {parentPost.deletionTime
                  ? `${new Date(parentPost.deletionTime).toLocaleString()} 에 삭제된 글이에요`
                  : parentPost.content}
              </p>
              {sharingPost && (
                <Border>
                  <GridSmallGap>
                    <Flex>
                      <Image
                        src={sharingPost.author?.imageUrl ?? '/images/shortcut-icon.webp'}
                        alt="profile"
                        width="20"
                        height="20"
                        style={BorderRadius}
                      />
                      <div>{sharingPost.author?.nickname ?? '탈퇴한 사용자'}</div>
                      <GreyH5>@{sharingPost.author?.name}</GreyH5>
                      {' · '}
                      <div>
                        {new Date(parentPost.creationTime).toLocaleDateString()}{' '}
                        <span>{parentPost.updateTime && '(수정됨)'}</span>
                      </div>
                    </Flex>
                    <p>
                      {sharingPost.deletionTime
                        ? `${new Date(
                            sharingPost.deletionTime
                          ).toLocaleString()} 에 삭제된 글이에요`
                        : sharingPost.content}
                    </p>
                  </GridSmallGap>
                </Border>
              )}

              <div>
                {new Date(parentPost.creationTime).toLocaleString()}{' '}
                <span>{parentPost.updateTime && '(수정됨)'}</span>
              </div>
              <GridColumn4Center>
                <div>
                  <Button onClick={toggleLikingPost}>
                    <HeartIcon selected={parentPost.isLiked} /> <span>{parentPost.likeCount}</span>
                  </Button>
                </div>
                <div>댓글 {parentPost.commentCount}</div>
                <div>공유 {parentPost.sharedCount}</div>
                <div>기타</div>
              </GridColumn4Center>
            </>
          ) : (
            <div>post not found</div>
          )}
        </Grid>

        {loading ? (
          <div>comments loading</div>
        ) : comments ? (
          comments.map((comment) => <CommentCard key={comment.id} comment={comment as Post} />)
        ) : (
          <div>comments not found</div>
        )}
      </Navigation>
    </PageHead>
  )
}

type Props = {
  children?: ReactNode[]
  comment: Post
  showParentAuthor?: boolean
}

export function CommentCard({ comment }: Props) {
  const comments = comment.comments

  return (
    <Card>
      <CommentContent comment={comment} showParentAuthor>
        {comments && <VerticalLine />}
        {comments?.map((comment, i) => (
          <CommentContent key={comment.id} comment={comment}>
            {[comments?.length - 1 !== i && <VerticalLine key={i} />]}
          </CommentContent>
        ))}
      </CommentContent>
    </Card>
  )
}

function CommentContent({ children, comment, showParentAuthor }: Props) {
  const author = comment.author
  const parentAuthor = comment.parentAuthor

  const [toggleLikingPostMutation, { loading }] = useToggleLikingPostMutation({
    onError: toastApolloError,
    variables: { id: comment.id },
  })

  function toggleLikingPost(e: any) {
    e.preventDefault()
    e.stopPropagation()
    toggleLikingPostMutation()
  }

  return (
    <>
      <FlexColumn>
        <Image
          src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
          alt="profile"
          width="40"
          height="40"
          style={BorderRadius}
        />
        {children?.[0]}
      </FlexColumn>
      <GridSmallGap>
        <FlexBetweenSmall>
          <div>
            <span>{author?.nickname ?? '탈퇴한 사용자'}</span>{' '}
            <GreyInlineH5>@{author?.name}</GreyInlineH5>
            {' · '}
            <span>{new Date(comment.creationTime).toLocaleDateString()}</span>
            <span>{comment.updateTime && '(수정됨)'}</span>
          </div>
          <ThreeDotsIcon />
        </FlexBetweenSmall>
        {showParentAuthor && parentAuthor && author && parentAuthor.name !== author.name && (
          <GreyInlineH5>
            Replying to <Link href={`/@${parentAuthor.name}`}>@{parentAuthor.name}</Link>
          </GreyInlineH5>
        )}
        <p>
          {comment.deletionTime
            ? `${new Date(comment.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : comment.content}
        </p>
        <GridColumn4>
          <div>
            <Button onClick={toggleLikingPost}>
              <HeartIcon selected={comment.isLiked} /> <span>{comment.likeCount}</span>
            </Button>
          </div>
          <div>댓글 {comment.commentCount}</div>
          <div>공유 {comment.sharedCount}</div>
          <div>기타</div>
        </GridColumn4>
      </GridSmallGap>
      {children?.[1]}
    </>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  > svg {
    width: 1rem;
  }
`

const BorderRadius = { borderRadius: '50%' }

const Border = styled.div`
  border: 1px solid ${(p) => p.theme.primaryAchromatic};
  border-radius: 0.5rem;
  padding: 0.8rem;
`

const Card = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;

  border: 1px solid ${(p) => p.theme.background};
  padding: 0.8rem 1rem;
`

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

const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
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

  > svg {
    width: 1.5rem;
  }
`

const FlexBetweenSmall = styled(FlexBetween)`
  > svg {
    width: 1rem;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const GreyH5 = styled.h5`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;
`

const GreyInlineH5 = styled(GreyH5)`
  display: inline-block;
`

const GridColumn4 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`

const GridColumn4Center = styled(GridColumn4)`
  > div {
    justify-content: center;
  }
`

const FlexColumn = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
`

const VerticalLine = styled.div`
  border-left: 1px solid #888;
  margin: auto;
  flex-grow: 1;
`
