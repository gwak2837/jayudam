import { FieldFunctionOptions, InMemoryCache } from '@apollo/client'

import { TypedTypePolicies } from '../graphql/generated/types-and-hooks'

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      posts: {
        merge: infiniteScroll,
        keyArgs: false,
      },
      comments: {
        merge: infiniteScroll,
        keyArgs: ['parentId'],
      },
    },
  },
}

const cache = new InMemoryCache({
  typePolicies,
})

export default cache

function infiniteScroll(
  existing: unknown[],
  incoming: unknown[],
  { args, readField }: FieldFunctionOptions
) {
  if (!existing) return incoming
  if (!incoming || incoming.length === 0) return existing

  const newList = [...existing]

  const insertingIndex = getInsertingIndex(existing, args?.lastId, readField)

  if (insertingIndex) {
    for (let j = 0; j < incoming.length; j++) {
      newList[insertingIndex + j] = incoming[j]
    }
  } else {
    for (let j = 0; j < incoming.length; j++) {
      newList[j] = incoming[j]
    }
  }

  return newList
}

function getInsertingIndex(existing: unknown[], lastId: string | undefined, readField: any) {
  for (let i = existing.length - 1; i >= 0; i--) {
    if (readField('id', existing[i]) === lastId) return i + 1
  }
  return null
}
