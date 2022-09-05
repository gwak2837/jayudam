import { InMemoryCache } from '@apollo/client'

import { TypedTypePolicies } from '../graphql/generated/types-and-hooks'

function infiniteScroll(existing: unknown[], incoming: unknown[]) {
  if (!existing) {
    return incoming
  } else {
    return [...existing, ...incoming]
  }
}

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      posts: {
        merge: infiniteScroll,
        keyArgs: [],
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
