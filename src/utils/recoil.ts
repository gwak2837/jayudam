import { atom } from 'recoil'

type CurrentUser = {
  nickname: string | null | undefined
  loading?: boolean
}

export const currentUser = atom<CurrentUser>({
  key: 'currentUser',
  default: { nickname: null, loading: true },
})

export const commentIdToMoveToAtom = atom({
  key: 'commentIdToMoveTo',
  default: '',
})
