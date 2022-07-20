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
  before.setUTCMonth(before.getUTCMonth() - n)
  before.setHours(0, 0, 0, 0)
  return before.toISOString().substring(0, 10)
}

export function getNYearBefore(n: number) {
  const before = new Date()
  before.setUTCFullYear(before.getUTCFullYear() - n)
  before.setHours(0, 0, 0, 0)
  return before.toISOString().substring(0, 10)
}
