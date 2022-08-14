import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import Modal from 'src/components/atoms/Modal'
import PageHead from 'src/components/PageHead'
import {
  Post,
  usePostQuery,
  useSharePostMutation,
  useToggleLikingPostMutation,
} from 'src/graphql/generated/types-and-hooks'
import Navigation from 'src/layouts/Navigation'
import { SubmitButton } from 'src/pages/register'
import { theme } from 'src/styles/global'
import BackArrowIcon from 'src/svgs/back-arrow.svg'
import CommentIcon from 'src/svgs/CommentIcon'
import HeartIcon from 'src/svgs/HeartIcon'
import ShareIcon from 'src/svgs/ShareIcon'
import ThreeDotsIcon from 'src/svgs/three-dots.svg'
import XIcon from 'src/svgs/x.svg'
import { stopPropagation } from 'src/utils'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH, TABLET_MIN_WIDTH_1 } from 'src/utils/constants'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
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

    if (name) {
      toggleLikingPostMutation()
    } else {
      toast.warn('로그인 후 시도해주세요')
    }
  }

  // 댓글 달기
  function showPostCreationModal(e: any) {
    e.preventDefault()
    e.stopPropagation()

    if (name) {
      toggleLikingPostMutation()
    } else {
      toast.warn('로그인 후 시도해주세요')
    }
  }

  return (
    <PageHead title={title} description={description}>
      <Navigation>
        <main>
          <Sticky>
            <BackArrowIcon onClick={goBack} />
            이야기
          </Sticky>
          <Grid>
            {loading ? (
              <div>post loading</div>
            ) : parentPost ? (
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
                    <ThreeDotsIcon />
                  </FlexBetween>
                </FlexCenter>
                {parentAuthor && author && parentAuthor.name !== author.name && (
                  <GreyInlineH5>
                    Replying to{' '}
                    <LineLink href={`/@${parentAuthor.name}`}>@{parentAuthor.name}</LineLink>
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
                      <FlexCenter>
                        <Image
                          src={sharingPost.author?.imageUrl ?? '/images/shortcut-icon.webp'}
                          alt="profile"
                          width="20"
                          height="20"
                          style={borderRadiusCircle}
                        />
                        <div>{sharingPost.author?.nickname ?? '탈퇴한 사용자'}</div>
                        <GreyH5>@{sharingPost.author?.name}</GreyH5>
                        {' · '}
                        <div>
                          {new Date(parentPost.creationTime).toLocaleDateString()}{' '}
                          <span>{parentPost.updateTime && '(수정됨)'}</span>
                        </div>
                      </FlexCenter>
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
                    <Button color={theme.error} onClick={toggleLikingPost}>
                      <HeartIcon selected={parentPost.isLiked} />{' '}
                      <span>{parentPost.likeCount}</span>
                    </Button>
                  </div>
                  <div>
                    <Button color={theme.primaryText} onClick={showPostCreationModal}>
                      <CommentIcon /> <span>{parentPost.commentCount}</span>
                    </Button>
                  </div>
                  <SharingPostButton parentPost={parentPost} />
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
        </main>
      </Navigation>
    </PageHead>
  )
}

type Props2 = {
  parentPost: Record<string, any>
}

function SharingPostButton({ parentPost }: Props2) {
  const author = parentPost.author
  const router = useRouter()
  const { name } = useRecoilValue(currentUser)

  const [openSharingPostModal, setSharingPostModal] = useState(false)

  const [sharePostMutation, { loading: shareLoading }] = useSharePostMutation({
    onCompleted: () => {
      toast.success('이야기 공유 완료')
      setSharingPostModal(false)
    },
    onError: toastApolloError,
  })

  function openSharingModal() {
    if (name) {
      setSharingPostModal(true)
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다.{' '}
          <Link
            href="/login"
            onClick={() => sessionStorage.setItem('redirectToAfterLogin', router.asPath)}
          >
            로그인하기
          </Link>
        </div>
      )
    }
  }

  function closeSharingModal() {
    setSharingPostModal(false)
  }

  function sharePost({ content }: any) {
    sharePostMutation({
      variables: {
        input: {
          content,
          sharingPostId: parentPost.id,
        },
      },
    })
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      content: '',
    },
  })

  return (
    <div>
      <Button color={theme.secondary} onClick={openSharingModal}>
        <ShareIcon selected={parentPost.doIShare} /> <span>{parentPost.sharedCount}</span>
      </Button>
      <Modal lazy open={openSharingPostModal} onClose={closeSharingModal} showCloseButton={false}>
        <ModalOrFullscreen onClick={stopPropagation} onSubmit={handleSubmit(sharePost)}>
          <FlexBetweenCenter>
            <Button0>
              <XIcon width="40px" onClick={closeSharingModal} />
            </Button0>
            <PrimaryButton disabled={errors && Object.keys(errors).length !== 0} type="submit">
              글쓰기
            </PrimaryButton>
          </FlexBetweenCenter>
          <Flex>
            <Image
              src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
              alt="profile"
              width="40"
              height="40"
              style={borderRadiusCircle}
            />
            <AutoTextarea
              autoFocus
              disabled={shareLoading}
              onInput={resizeTextareaHeight}
              onKeyDown={submitWhenCmdEnter}
              placeholder="Add content"
              {...register('content', {
                required: true,
                minLength: 1,
                maxLength: 200,
              })}
            />
          </Flex>
        </ModalOrFullscreen>
      </Modal>
    </div>
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

  // 해당 글로 이동하기
  const router = useRouter()

  function goToPostPage() {
    router.push(`/post/${comment.id}`)
  }

  // 좋아요
  const [toggleLikingPostMutation, { loading }] = useToggleLikingPostMutation({
    onError: toastApolloError,
    variables: { id: comment.id },
  })

  function toggleLikingPost(e: any) {
    e.preventDefault()
    e.stopPropagation()
    toggleLikingPostMutation()
  }

  // 댓글 달기
  function showPostCreationModal(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  // 공유하기
  function sharePost(e: any) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      <FlexColumn>
        <Image
          src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
          alt="profile"
          width="40"
          height="40"
          style={borderRadiusCircle}
        />
        {children?.[0]}
      </FlexColumn>
      <GridSmallGap onClick={goToPostPage}>
        <FlexBetweenSmall>
          <div>
            <Bold disabled={!author}>{author?.nickname ?? '탈퇴한 사용자'}</Bold>{' '}
            {author && (
              <LineLink href={`/@${author.name}`} onClick={stopPropagation}>
                <GreyInlineH5>@{author.name}</GreyInlineH5>
              </LineLink>
            )}
            {' · '}
            <span>{new Date(comment.creationTime).toLocaleDateString()}</span>
            <span>{comment.updateTime && '(수정됨)'}</span>
          </div>
          <ThreeDotsIcon />
        </FlexBetweenSmall>
        {showParentAuthor && parentAuthor && author && parentAuthor.name !== author.name && (
          <GreyInlineH5>
            Replying to{' '}
            <Link href={`/@${parentAuthor.name}`} onClick={stopPropagation}>
              @{parentAuthor.name}
            </Link>
          </GreyInlineH5>
        )}
        <p>
          {comment.deletionTime
            ? `${new Date(comment.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : comment.content}
        </p>
        <GridColumn4>
          <div>
            <Button color={theme.error} onClick={toggleLikingPost}>
              <HeartIcon selected={comment.isLiked} /> <span>{comment.likeCount}</span>
            </Button>
          </div>
          <div>
            <Button color={theme.primaryText} onClick={showPostCreationModal}>
              <CommentIcon /> <span>{comment.commentCount}</span>
            </Button>
          </div>
          <div>
            <Button color={theme.secondary} onClick={sharePost}>
              <ShareIcon /> <span>{comment.sharedCount}</span>
            </Button>
          </div>
          <div>기타</div>
        </GridColumn4>
      </GridSmallGap>

      {children?.[1]}
    </>
  )
}

const Button = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  > svg {
    width: 1rem;
    path {
      transition: fill 0.3s ease;
    }
  }

  > span {
    color: ${(p) => p.theme.primaryTextAchromatic};
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

const Border = styled.div`
  border: 1px solid ${(p) => p.theme.primaryAchromatic};
  border-radius: 0.5rem;
  padding: 0.8rem;
`

const Card = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;

  border: 1px solid ${(p) => p.theme.shadow};
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
  cursor: pointer;
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

const FlexCenter = styled.div`
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

const Bold = styled.b<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : '#000')};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`

const LineLink = styled(Link)`
  :hover {
    > * {
      text-decoration: underline;
    }
  }
`

const ModalOrFullscreen = styled.form`
  background: ${(p) => p.theme.backgroud};
  padding: 1rem;

  display: grid;
  gap: 1rem;

  @media (max-width: ${TABLET_MIN_WIDTH_1}) {
    width: 100%;
    height: 100%;

    grid-template-rows: auto 1fr;
  }
`

const FlexBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button0 = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
`

const PrimaryButton = styled(SubmitButton)`
  border-radius: 999px;
  padding: 0.5rem 1rem;
  width: auto;
`

const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`

const AutoTextarea = styled.textarea`
  width: 100%;
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
