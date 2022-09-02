import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { Post } from 'src/graphql/generated/types-and-hooks'
import { borderRadiusCircle } from 'src/pages/post'
import { LineLink } from 'src/pages/post/[id]'
import { stopPropagation } from 'src/utils'
import styled, { css } from 'styled-components'
import { GridSmallGap } from '../atoms/Flex'

type Props = {
  sharedPost: Post
}

export default function SharedPostCard({ sharedPost }: Props) {
  const author = sharedPost.author

  // 페이지 이동
  const router = useRouter()

  function goToSharedPost(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()

    router.push(`/post/${sharedPost.id}`)
  }

  function goToUserPage(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()

    if (author) {
      router.push(`/@${author.name}`)
    }
  }

  return (
    <Border onClick={goToSharedPost}>
      <GridSmallGap>
        <Flex>
          <Image
            src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="20"
            height="20"
            onClick={goToUserPage}
            style={borderRadiusCircle}
          />
          <FlexItem onClick={goToUserPage}>{author?.nickname ?? '탈퇴한 사용자'}</FlexItem>
          {author && (
            <LineLink href={`/@${author.name}`} onClick={stopPropagation}>
              <GreyH5>@{author.name}</GreyH5>
            </LineLink>
          )}
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
