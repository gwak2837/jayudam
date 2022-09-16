import { Sex } from './generated/types-and-hooks'

export function formatSex(sex?: Sex | null) {
  switch (sex) {
    case Sex.Unknown:
      return '알 수 없음'
    case Sex.Male:
      return '남'
    case Sex.Female:
      return '여'
    case Sex.Other:
      return '기타'
    default:
      return sex
  }
}
