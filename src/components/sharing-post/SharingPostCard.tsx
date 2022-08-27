import Image from 'next/future/image'
import { Post } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { GridSmallGap } from 'src/pages/post/[id]'
import styled, { css } from 'styled-components'

type Props = {
  sharedPost: Post
}

export default function SharedPostCard({ sharedPost }: Props) {
  return (
    <Border>
      <GridSmallGap>
        <Flex>
          <Image
            src={sharedPost.author?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="20"
            height="20"
            style={borderRadiusCircle}
          />
          <FlexItem>{sharedPost.author?.nickname ?? '탈퇴한 사용자'}</FlexItem>
          <GreyH5>@{sharedPost.author?.name}</GreyH5>
          {' · '}
          <FlexItem>
            {new Date(sharedPost.creationTime).toLocaleDateString()}{' '}
            <span>{sharedPost.updateTime && '(수정됨)'}</span>
          </FlexItem>
        </Flex>
        <p>
          {sharedPost.deletionTime
            ? `${new Date(sharedPost.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : sharedPost.content}
        </p>
      </GridSmallGap>
    </Border>
  )
}

const Border = styled.div`
  border: 1px solid ${(p) => p.theme.primaryAchromatic};
  border-radius: 0.5rem;
  padding: 0.8rem;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  min-width: 0;
`

const flexItemTextOverflow = css`
  min-width: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const GreyH5 = styled.h5`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;

  ${flexItemTextOverflow}
`

const FlexItem = styled.div`
  ${flexItemTextOverflow}
`
