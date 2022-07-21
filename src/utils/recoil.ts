import { atom } from 'recoil'

type CurrentUser = {
  nickname: string | null | undefined
}

export const currentUser = atom<CurrentUser>({
  key: 'currentUser',
  default: {
    nickname: null,
  },
})

export const commentIdToMoveToAtom = atom({
  key: 'commentIdToMoveTo',
  default: '',
})
