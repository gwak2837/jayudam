import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import styled from 'styled-components'

import { Post } from '../../graphql/generated/types-and-hooks'
import { borderRadiusCircle } from '../../pages/post'
import { stopPropagation } from '../../utils'
import { FlexCenter, GridSmallGap, TextOverflow as TextOverflow_ } from '../atoms/Flex'
import { PostImages } from '../PostImages'

type Props = {
  sharedPost: Post
}

export default function SharedPostCard({ sharedPost }: Props) {
  const author = sharedPost.author
  const imageUrls = sharedPost.imageUrls

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
        <FlexCenterGap>
          <Image
            src={author?.imageUrl ?? '/images/shortcut-icon.webp'}
            alt="profile"
            width="20"
            height="20"
            onClick={goToUserPage}
            style={borderRadiusCircle}
          />
          <TextOverflow onClick={goToUserPage}>{author?.nickname ?? '탈퇴한 사용자'}</TextOverflow>
          {author && (
            <OverflowAuto>
              <Link href={`/@${author.name}`} onClick={stopPropagation}>
                <GreyH5 as="h5">@{author.name}</GreyH5>
              </Link>
            </OverflowAuto>
          )}
          <TextOverflow>
            {sharedPost.creationTime && new Date(sharedPost.creationTime).toLocaleDateString()}{' '}
            <span>{sharedPost.updateTime && '(수정됨)'}</span>
          </TextOverflow>
        </FlexCenterGap>

        <p>
          {sharedPost.deletionTime
            ? `${new Date(sharedPost.deletionTime).toLocaleString()} 에 삭제된 글이에요`
            : sharedPost.content}
        </p>

        {imageUrls && <PostImages imageUrls={imageUrls} />}
      </GridSmallGap>
    </Border>
  )
}

const Border = styled.div`
  border: 1px solid ${(p) => p.theme.primaryAchromatic};
  border-radius: 0.5rem;
  padding: 0.8rem;
`

const FlexCenterGap = styled(FlexCenter)`
  gap: 0.5rem;

  min-width: 0;
`

export const TextOverflow = styled(TextOverflow_)`
  min-width: 2rem;
`

export const OverflowAuto = styled.div`
  overflow: auto;
`

export const GreyH5 = styled(TextOverflow_)`
  color: ${(p) => p.theme.primaryTextAchromatic};
  font-weight: 400;

  min-width: 1rem;
`
