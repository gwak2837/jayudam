import { atom } from 'recoil'

export const currentUser = atom<{ nickname: string | null | undefined }>({
  key: 'currentUser',
  default: { nickname: null },
})

export const commentIdToMoveToAtom = atom({
  key: 'commentIdToMoveTo',
  default: '',
})
