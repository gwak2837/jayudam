import { parse } from 'date-fns'
import formatWithOptions from 'date-fns/fp/formatWithOptions'
import koLocale from 'date-fns/locale/ko'

export const formatDate = formatWithOptions({ locale: koLocale })
export const parseDate = (dateFormat: string) => (str: string) => parse(str, dateFormat, new Date())

export const formatFullDate = formatDate('y. M. d. (E) a h:mm')
export const parseFullDate = parseDate('y. M. d. (E) a h:mm')

export const formatSimpleDate = formatDate('y. M. d. H:mm')
export const parseSimpleDate = parseDate('y. M. d. H:mm')

export function getNMonthBefore(n: number) {
  const before = new Date()
  before.setMonth(before.getMonth() - n)
  before.setHours(0, 0, 0, 0)
  return before.getTime()
}

export function getNYearBefore(n: number) {
  const before = new Date()
  before.setFullYear(before.getFullYear() - n)
  before.setHours(0, 0, 0, 0)
  return before.getTime()
}

export function formatISOLocalDate(date2: Date | string | number | null | undefined) {
  if (date2 == null) return ''
  const date = typeof date2 === 'string' || typeof date2 === 'number' ? new Date(date2) : date2
  const localMonth = `${date.getMonth() + 1}`.padStart(2, '0')
  const localDate = `${date.getDate()}`.padStart(2, '0')
  return `${date.getFullYear()}-${localMonth}-${localDate}`
}

export function getTimeFromDateString(date: string | null) {
  return date ? new Date(date).getTime() : null
}
