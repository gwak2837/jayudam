import { NEXT_PUBLIC_BACKEND_URL } from '../common/constants'

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

// eslint-disable-next-line no-undef
export async function fetchWithAuth(url: string, init?: RequestInit) {
  const jwt =
    globalThis.sessionStorage?.getItem('jwt') ?? globalThis.localStorage?.getItem('jwt') ?? ''

  if (jwt) {
    if (init) {
      if (init.headers) {
        ;(init.headers as any).authorization = jwt
      } else {
        init.headers = { authorization: jwt }
      }
    } else {
      init = { headers: { authorization: jwt } }
    }
  }

  return fetch(`${NEXT_PUBLIC_BACKEND_URL}${url}`, init).then((response) => response.json())
}
