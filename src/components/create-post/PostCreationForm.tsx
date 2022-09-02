import { gql } from '@apollo/client'
import { RefObject, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { toastApolloError } from 'src/apollo/error'
import { useCreatePostMutation } from 'src/graphql/generated/types-and-hooks'
import { FlexBetween_ } from 'src/styles'
import { resizeTextareaHeight, submitWhenCmdEnter } from 'src/utils/react'
import styled from 'styled-components'
import { AutoTextarea_ } from '../atoms/AutoTextarea'
import { Card } from '../CommentCard'
import { PrimaryButton } from '../sharing-post/SharingPostButton'

type Props = {
  children: ReactNode
  postCreationRef: RefObject<HTMLFormElement>
  username: string | null | undefined
}

export function PostCreationForm({ children, postCreationRef, username }: Props) {
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
    <form onSubmit={handleSubmit(createPost)} ref={postCreationRef}>
      <Card>
        {children}

        <GridSmallGap>
          <AutoTextarea
            disabled={!username || createLoading}
            onInput={resizeTextareaHeight}
            onKeyDown={submitWhenCmdEnter}
            placeholder="Add content"
            {...register('content')}
          />
          <FlexBetweenCenter>
            <PrimaryOrError error={contentLength > 200}>{contentLength}</PrimaryOrError>
            <PrimaryButton
              disabled={
                !username ||
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
