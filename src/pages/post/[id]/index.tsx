import { useRouter } from 'next/router'
import React from 'react'
import { toastApolloError } from 'src/apollo/error'
import PageHead from 'src/components/PageHead'
import { usePostQuery } from 'src/graphql/generated/types-and-hooks'

const description = ''

export default function PostPage() {
  const router = useRouter()
  const postId = (router.query.id ?? '') as string

  const { data, loading } = usePostQuery({
    onError: toastApolloError,
    skip: !postId,
    variables: { id: postId },
  })

  return (
    <PageHead title={`{제목} - 자유담`} description={description}>
      <pre style={{ margin: 0, overflow: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>
    </PageHead>
  )
}
