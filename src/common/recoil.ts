import { atom } from 'recoil'

import { Post } from '../graphql/generated/types-and-hooks'

type CurrentUser = {
  name: string | null | undefined
}

export const currentUser = atom<CurrentUser>({
  key: 'currentUser',
  default: {
    name: null,
  },
})

export const commentIdToMoveToAtom = atom({
  key: 'commentIdToMoveTo',
  default: '',
})
