import { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import XIcon from '../../svgs/x.svg'
import { stopPropagation } from '../../utils'
import { MOBILE_MIN_HEIGHT, TABLET_MIN_WIDTH } from '../../utils/constants'
import { resizeTextareaHeight, submitWhenCmdEnter } from '../../utils/react'
import { AutoTextarea_ } from '../atoms/AutoTextarea'
import { FlexBetweenCenter, Flex as Flex_ } from '../atoms/Flex'
import { Button0, PrimaryButton, SmallForm } from '../sharing-post/SharingPostButton'
import { PrimaryOrError } from './PostCreationForm'

type Props = {
  children: ReactNode[]
  disabled: boolean
  haveToReset: boolean
  onClose: any
  onReset: any
  onSubmit: any
}

export default function PostCreationModalForm({
  children,
  disabled,
  haveToReset,
  onClose,
  onReset,
  onSubmit,
}: Props) {
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

  useEffect(() => {
    if (haveToReset) {
      reset()
      onReset()
    }
  }, [haveToReset, onReset, reset])

  return (
    <FullscreenForm as="form" onClick={stopPropagation} onSubmit={handleSubmit(onSubmit)}>
      <FlexBetweenCenter>
        <Button0>
          <XIcon width="40px" onClick={onClose} />
        </Button0>
        <PrimaryButton
          disabled={disabled || (errors && Object.keys(errors).length !== 0)}
          type="submit"
        >
          글쓰기
        </PrimaryButton>
      </FlexBetweenCenter>
      {children[2]}
      <Flex>
        {children[0]}
        <AutoTextarea
          autoFocus
          disabled={disabled}
          onInput={resizeTextareaHeight}
          onKeyDown={submitWhenCmdEnter}
          placeholder="Add content"
          {...register('content', {
            maxLength: 200,
          })}
        />
      </Flex>
      <PrimaryOrError error={contentLength > 200}>{contentLength}</PrimaryOrError>
      {children[1]}
    </FullscreenForm>
  )
}

const AutoTextarea = styled(AutoTextarea_)`
  @media (min-width: ${TABLET_MIN_WIDTH}) {
    min-width: ${MOBILE_MIN_HEIGHT};
  }
`

const Flex = styled(Flex_)`
  gap: 0.5rem;
`

const FullscreenForm = styled(SmallForm)`
  width: 100%;
  height: 100%;
  border-radius: 0;

  @media (min-width: ${TABLET_MIN_WIDTH}) {
    border-radius: 0.5rem;
    width: auto;
    height: auto;
    max-height: 90vh;
  }
`
