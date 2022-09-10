import DeleteIcon from '../../svgs/delete.svg'
import { Post } from '../../graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { FlexCenterSmallGap } from '../atoms/Flex'
import { useRecoilValue } from 'recoil'
import { currentUser } from '../../utils/recoil'
import { toast } from 'react-toastify'
import LoginLink from '../atoms/LoginLink'

type Props = {
  loading: boolean
  onDelete: () => void
  post: Post
}

export default function DrawerPostContent({ loading, onDelete, post }: Props) {
  const { name } = useRecoilValue(currentUser)

  function deletePost() {
    if (!post.author) {
      toast.warn('이미 글쓴이가 탈퇴했습니다')
    } else if (name === post.author.name) {
      onDelete()
    } else if (name) {
      toast.warn('내가 쓴 글이 아닙니다')
    } else {
      toast.warn(
        <div>
          로그인이 필요합니다. <LoginLink />
        </div>
      )
    }
  }

  return (
    <ul>
      <RedButton disabled={loading} onClick={deletePost}>
        <Padding as="li">
          <DeleteIcon width="1.5rem" /> 이야기 삭제하기
        </Padding>
      </RedButton>
    </ul>
  )
}

const Button = styled.button`
  padding: 0;
  width: 100%;
`

const RedButton = styled(Button)`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.error)};
  path {
    fill: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.error)};
  }
`

const Padding = styled(FlexCenterSmallGap)`
  padding: 1rem;
  border-bottom: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
`
