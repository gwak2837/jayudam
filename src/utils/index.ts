import { NextRouter } from 'next/router'
import { KeyboardEvent, MouseEvent } from 'react'

import { NEXT_PUBLIC_BACKEND_URL } from './constants'

export const viewportWidth = Math.max(
  globalThis.document?.documentElement.clientWidth || 0,
  globalThis.window?.innerWidth || 0
)

export const viewportHeight = Math.max(
  globalThis.document?.documentElement.clientHeight || 0,
  globalThis.window?.innerHeight || 0
)

export function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffleArray(array: unknown[], getRandomNumber: () => number) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(getRandomNumber() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function stopPropagation(e: MouseEvent<HTMLElement>) {
  e.stopPropagation()
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getUserNickname(router: NextRouter) {
  return ((router.query.userNickname ?? '') as string).slice(1)
}

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
  'i'
)

export function isValidUrl(url: string) {
  return !!urlPattern.test(url)
}

export function formatPhoneNumber(phoneNumber: string) {
  const value3 = phoneNumber.replaceAll(' ', '')
  const value2 = value3.replaceAll('+', '')
  const value = value2.replaceAll('-', '')

  if (value.length >= 9) {
    return `+${value.slice(0, 2)} ${value.slice(2, 4)}-${value.slice(4, 8)}-${value.slice(8)}`
  } else if (value.length >= 5) {
    return `+${value.slice(0, 2)} ${value.slice(2, 4)}-${value.slice(4)}`
  } else if (value.length >= 3) {
    return `+${value.slice(0, 2)} ${value.slice(2)}`
  } else {
    return `+${value}`
  }
}

export function isEmpty(object: Record<string, unknown>) {
  for (const key in object) {
    return false
  }
  return true
}

export async function uploadImageFiles(formData: FormData) {
  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/upload`, {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

export function submitWhenShiftEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
  if (e.code === 'Enter' && e.shiftKey) {
    e.preventDefault() // To prevent adding line break when shift+enter pressed
    const submitEvent = new Event('submit', { bubbles: true })
    const parentForm = (e.target as any).form as HTMLFormElement
    parentForm.dispatchEvent(submitEvent)
  }
}

export function isArrayEqual(a?: unknown[] | null, b?: unknown[] | null) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}
