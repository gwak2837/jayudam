import { FieldFunctionOptions, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge: infiniteScroll,
          keyArgs: false,
        },
        comments: {
          merge: (existings, incomings, { args, readField }) => {
            if (!existings) return incomings
            if (!incomings || incomings.length === 0) return existings

            const newList = [...existings]
            const existingsSet = new Set(existings.map((aa: any) => readField('id', aa)))
            const insertingIndex = getInsertingIndex(existings, args?.lastId, readField)

            for (let i = insertingIndex, j = 0; j < incomings.length; j++) {
              const incoming = incomings[j] as any

              if (!existingsSet.has(readField('id', incoming))) {
                newList[i] = incoming
                i++
              }
            }

            return newList
          },
          keyArgs: ['parentId'],
        },
      },
    },
  },
})

export default cache

function infiniteScroll(
  existings: unknown[],
  incomings: unknown[],
  { args, readField }: FieldFunctionOptions
) {
  if (!existings) return incomings
  if (!incomings || incomings.length === 0) return existings

  const newList = [...existings]
  const existingsSet = new Set(existings.map((aa: any) => readField('id', aa)))

  const insertingIndex = getInsertingIndex(existings, args?.lastId, readField)

  for (let i = insertingIndex, j = 0; j < incomings.length; j++) {
    const incoming = incomings[j] as any

    if (!existingsSet.has(readField('id', incoming))) {
      newList[i] = incoming
      i++
    }
  }

  return newList
}

function getInsertingIndex(existing: unknown[], lastId: string | undefined, readField: any) {
  if (!lastId) return 0

  for (let i = existing.length - 1; i >= 0; i--) {
    if (readField('id', existing[i]) === lastId) return i + 1
  }

  return 0
}
