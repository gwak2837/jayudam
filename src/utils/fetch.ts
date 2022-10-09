import { NEXT_PUBLIC_BACKEND_URL } from './constants'

export async function uploadFormDataFiles(formData: FormData) {
  const jwt =
    globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/upload/images`, {
    method: 'POST',
    headers: {
      authorization: jwt,
    },
    body: formData,
  })

  return response.json()
}
