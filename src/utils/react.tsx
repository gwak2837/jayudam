import { Fragment } from 'react'

export function applyLineBreak(line: string) {
  return line.split('\n').map((title, i) => (
    <Fragment key={i}>
      {title}
      <br />
    </Fragment>
  ))
}
