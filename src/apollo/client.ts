import { ApolloClient, NormalizedCacheObject, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'

import { sha256 } from '../utils'
import { NEXT_PUBLIC_BACKEND_URL } from '../utils/constants'
import cache from './cache'

const httpLink = createHttpLink({
  uri: `${NEXT_PUBLIC_BACKEND_URL}`,
})

// Pull the login token from browser Storage every time a request is sent:
const authLink = setContext((_, { headers }) => {
  const jwt =
    globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

  return {
    headers: {
      ...headers,
      authorization: jwt,
    },
  }
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: createPersistedQueryLink({ sha256 }).concat(authLink.concat(httpLink)),
})
