/* eslint-disable no-console */

import { MouseEvent } from 'react'

export function parseJWT(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    globalThis.window
      ?.atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export function getViewportWidth() {
  return Math.max(
    globalThis.document?.documentElement.clientWidth || 0,
    globalThis.window?.innerWidth || 0
  )
}

export function getViewportHeight() {
  return Math.max(
    globalThis.document?.documentElement.clientHeight || 0,
    globalThis.window?.innerHeight || 0
  )
}

export function stopPropagation(e: MouseEvent<HTMLElement>) {
  e.stopPropagation()
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

export function isArrayEqual(a?: unknown[] | null, b?: unknown[] | null) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export async function sha256(message: string) {
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))

  // convert bytes to hex string
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function enableNotificationAPI() {
  if (!window.Notification) {
    console.log('알림 지원 안함')
    return false
  }

  if (Notification.permission === 'granted') {
    console.log('알림 이미 허용됨')
    return true
  } else if (Notification.permission === 'denied') {
    console.log('알림 이미 거부됨')
    return false
  }

  const result = await Notification.requestPermission()

  if (result === 'denied') {
    console.log('알림 권한 거부함')
    return false
  } else if (result === 'default') {
    console.log('알림 권한 선택 안함')
    return false
  }

  return true
}
