import { NEXT_PUBLIC_BACKEND_URL } from './constants'

export async function uploadFormDataFiles(formData: FormData) {
  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/upload/images`, {
    method: 'POST',
    body: formData,
  })
  return response.json()
}
