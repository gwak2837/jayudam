import { useState } from 'react'
import { toast } from 'react-toastify'
import { atom, useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'

import { toastApolloError } from '../apollo/error'
import { useDeletePostMutation, Post } from '../graphql/generated/types-and-hooks'
import DeleteIcon from '../svgs/delete.svg'
import { stopPropagation } from '../utils'
import { currentUser } from '../utils/recoil'
import Drawer from './atoms/Drawer'
import { GridCenterCenter } from './atoms/Flex'
import LoginLink from './atoms/LoginLink'
import Modal from './atoms/Modal'

export default function PostDrawer() {
  const { name } = useRecoilValue(currentUser)
  const [{ isOpened, onDelete, post }, setPostDrawer] = useRecoilState(postDrawer)

  function closeDrawer() {
    setPostDrawer({ isOpened: false })
  }

  // 이야기 삭제
  const [deletePostMutation, { loading: deleteLoading }] = useDeletePostMutation({
    onCompleted: () => {
      if (onDelete) onDelete()
      setIsModalOpened(false)
      closeDrawer()
      toast.success('이야기 삭제 완료')
    },
    onError: toastApolloError,
    update: (cache, { data }) =>
      data?.deletePost?.deletionTime === null &&
      cache.evict({ id: `Post:${data.deletePost.id}` }) &&
      cache.gc(),
  })

  async function deletePost() {
    if (post) {
      if (!post.author) {
        toast.warn('이미 글쓴이가 탈퇴했습니다')
      } else if (name === post.author.name) {
        deletePostMutation({ variables: { id: post.id } })
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
  }

  // 이야기 삭제 확인 Modal
  const [isModalOpened, setIsModalOpened] = useState(false)

  function openModal() {
    setIsModalOpened(true)
  }

  function closeModal() {
    setIsModalOpened(false)
  }

  return (
    <Drawer open={isOpened} onClose={closeDrawer}>
      <ul>
        <BorderLi>
          <FlexRedButton disabled={deleteLoading} onClick={openModal}>
            <DeleteIcon width="1.5rem" /> 이야기 삭제하기
          </FlexRedButton>
          <Modal open={isModalOpened} onClose={closeModal} showCloseButton={false}>
            <Form onClick={stopPropagation}>
              <H3>이야기를 삭제할까요?</H3>
              <Grid1to1>
                <Button disabled={deleteLoading} onClick={closeModal} type="button">
                  취소
                </Button>
                <RedButton disabled={deleteLoading} onClick={deletePost} type="button">
                  삭제
                </RedButton>
              </Grid1to1>
            </Form>
          </Modal>
        </BorderLi>
      </ul>
    </Drawer>
  )
}

type PostDrawerRecoil = {
  isOpened: boolean
  onDelete?: () => void
  post?: Post
}

export const postDrawer = atom<PostDrawerRecoil>({
  key: 'postDrawer',
  default: {
    isOpened: false,
  },
})

const BorderLi = styled.li`
  border-bottom: 1px solid ${(p) => p.theme.primaryBackgroundAchromatic};
`

const Grid1to1 = styled(GridCenterCenter)`
  grid-template-columns: 1fr 1fr;
`

const Button = styled.button`
  padding: 1rem;
`

const RedButton = styled(Button)`
  color: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.error)};
`

const FlexRedButton = styled(RedButton)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  path {
    fill: ${(p) => (p.disabled ? p.theme.primaryAchromatic : p.theme.error)};
  }
`

const Form = styled.form`
  background: ${(p) => p.theme.backgroud};
  border-radius: 0.5rem;
`

const H3 = styled.h3`
  padding: 1rem;
`
