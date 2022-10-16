import { useMutation } from '@tanstack/react-query'

import { toastError } from '../../apollo/error'
import PageHead from '../../components/PageHead'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatroomPage() {
  // Message
  const { mutate } = useMutation(
    async () =>
      fetchWithAuth('/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatroomId: 'chatroomId',
          message: {
            content: ' ',
            type: 0,
          },
        }),
      }),
    { onError: toastError }
  )

  function send(e: any) {
    e.preventDefault()
    console.log('submit')
    mutate()
  }

  return (
    <PageHead title=" - 자유담" description="">
      {}
    </PageHead>
  )
}
