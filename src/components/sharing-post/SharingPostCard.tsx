import Image from 'next/future/image'
import { Post } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { FlexCenter, GreyH5, GridSmallGap } from 'src/pages/post/[id]'
import styled from 'styled-components'

type Props = {
  sharedPost: Post
}

export default function SharedPostCard({ sharedPost }: Props) {
  return (
    <Border>
      <GridSmallGap>
        <FlexCenter>
          <Image
            src={sharedPost.author?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="20"
            height="20"
            style={borderRadiusCircle}
          />
          <div>{sharedPost.author?.nickname ?? '탈퇴한 사용자'}</div>
          <GreyH5>@{sharedPost.author?.name}</GreyH5>
          {' · '}
          <div>
            {new Date(sharedPost.creationTime).toLocaleDateString()}{' '}
            <span>{sharedPost.updateTime && '(수정됨)'}</span>
          </div>
        </FlexCenter>
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
