import { atom } from 'recoil'

export const currentUser = atom({
  key: 'currentUser',
  default: { nickname: '' },
})

export const commentIdToMoveToAtom = atom({
  key: 'commentIdToMoveTo',
  default: '',
})
