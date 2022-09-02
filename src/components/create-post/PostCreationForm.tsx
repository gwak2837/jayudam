import { ApolloCache, gql } from '@apollo/client'
import { ReactNode, RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { toastApolloError } from 'src/apollo/error'
import { useCreatePostMutation } from 'src/graphql/generated/types-and-hooks'
import { FlexBetween_ } from 'src/styles'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
import { currentUser } from 'src/utils/recoil'
import styled from 'styled-components'

import { AutoTextarea_ } from '../atoms/AutoTextarea'
import LoginLink from '../atoms/LoginLink'
import { Card } from '../CommentCard'
import { PrimaryButton } from '../sharing-post/SharingPostButton'

type Props = {
  children: ReactNode
  postCreationRef: RefObject<HTMLFormElement>
}

export function PostCreationForm({ children, postCreationRef }: Props) {
  const { name } = useRecoilValue(currentUser)

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
    onCompleted: toastResult,
    onError: toastApolloError,
    update: addNewPost,
  })

  function createPost({ content }: any) {
    createPostMutation({
      variables: {
        input: { content },
      },
    })
  }

  function needLogin() {
    if (!name) {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(createPost)} ref={postCreationRef}>
      <Card onClick={needLogin}>
        {children}

        <GridSmallGap>
          <AutoTextarea
            disabled={!name || createLoading}
            onInput={resizeTextareaHeight}
            onKeyDown={submitWhenCmdEnter}
            placeholder="Add content"
            {...register('content')}
          />
          <FlexBetweenCenter>
            <PrimaryOrError error={contentLength > 200}>{contentLength}</PrimaryOrError>
            <PrimaryButton
              disabled={
                !name ||
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
  )
}

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

export const PrimaryOrError = styled.span<{ error: boolean }>`
  color: ${(p) => (p.error ? p.theme.error : p.theme.primaryText)};
`

function toastResult() {
  toast.success('이야기 생성 완료')
}

function addNewPost(cache: ApolloCache<any>, { data }: any) {
  return (
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
    })
  )
}
