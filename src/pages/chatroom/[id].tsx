import { useMutation, useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { toastError } from '../../apollo/error'
import { currentUser } from '../../common/recoil'
import PageHead from '../../components/PageHead'
import Navigation from '../../layouts/Navigation'
import { fetchWithAuth } from '../../utils/fetch'

export default function ChatroomPage() {
  const router = useRouter()
  const chatroomId = router.query.id

  const { name } = useRecoilValue(currentUser)

  // Message
  const [message, setMessage] = useState('')

  const { mutate } = useMutation(
    () =>
      fetchWithAuth('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatroomId,
          message: {
            content: message,
            type: 0,
          },
        }),
      }),
    { onError: toastError }
  )

  function send(e: any) {
    if (!name) return

    console.log('submit')
    mutate()
  }

  // Chatroom
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['chatroom', chatroomId],
      ({ pageParam }) =>
        fetchWithAuth(
          `/chatroom/${chatroomId}?${new URLSearchParams({
            ...(pageParam && { lastChatId: pageParam }),
          })}`
        ),
      {
        enabled: Boolean(chatroomId),
        getNextPageParam: (lastPage) => lastPage.lastChatId,
        onError: toastError,
      }
    )

  const pages = data?.pages

  return (
    <PageHead title="대화하기 - 자유담" description="">
      <Navigation>
        <main style={{ overflow: 'auto' }}>
          <div>
            <input onChange={(e) => setMessage(e.target.value)} value={message} />
            <button onClick={send}>보내기</button>
          </div>
          <button disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
            더보기
          </button>
          {pages
            ?.map((page, i) => (
              <Fragment key={i}>
                {page.data
                  .map((chat) => (
                    <Li key={chat.id}>
                      <div>{chat.creationTime}</div>
                      <div>{chat.content}</div>
                      <Link href={`/@${chat.user.name}`}>
                        <div>{chat.user.nickname}</div>
                      </Link>
                    </Li>
                  ))
                  .reverse()}
              </Fragment>
            ))
            .reverse()}
        </main>
      </Navigation>
    </PageHead>
  )
}

const Li = styled.li`
  padding: 1rem;
`
