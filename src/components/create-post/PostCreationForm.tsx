import { ReactNode, RefObject, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { resizeTextareaHeight, submitWhenCmdEnter } from '../../utils/react'
import { currentUser } from '../../utils/recoil'
import { AutoTextarea_ } from '../atoms/AutoTextarea'
import { FlexBetweenCenter } from '../atoms/Flex'
import LoginLink from '../atoms/LoginLink'
import { Card } from '../CommentCard'
import { PrimaryButton } from '../sharing-post/SharingPostButton'

type Props = {
  children: ReactNode
  disabled: boolean
  haveToReset: boolean
  onReset: any
  onSubmit: any
  postCreationRef: RefObject<HTMLFormElement>
}

export function PostCreationForm({
  children,
  disabled,
  haveToReset,
  onReset,
  onSubmit,
  postCreationRef,
}: Props) {
  const { name } = useRecoilValue(currentUser)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      content: '',
    },
  })

  const contentLength = watch('content').length

  function needLogin() {
    if (!name) {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  useEffect(() => {
    if (haveToReset) {
      reset()
      onReset()
    }
  }, [haveToReset, onReset, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={postCreationRef}>
      <Card onClick={needLogin}>
        {children}
        <GridSmallGap>
          <AutoTextarea
            disabled={!name || disabled}
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
                disabled ||
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

const GridSmallGap = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const PrimaryOrError = styled.span<{ error: boolean }>`
  color: ${(p) => (p.error ? p.theme.error : p.theme.primaryText)};
`
