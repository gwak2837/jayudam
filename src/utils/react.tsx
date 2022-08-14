import { Fragment, KeyboardEvent } from 'react'

export function applyLineBreak(line: string) {
  return line.split('\n').map((title, i) => (
    <Fragment key={i}>
      {title}
      <br />
    </Fragment>
  ))
}

export function resizeTextareaHeight(e: KeyboardEvent<HTMLTextAreaElement>) {
  const eventTarget = e.target as HTMLTextAreaElement
  eventTarget.style.height = 'auto'
  eventTarget.style.height = `${eventTarget.scrollHeight}px`
}

export function submitWhenCmdEnter(e: KeyboardEvent<HTMLTextAreaElement>) {
  if (e.code === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault() // To prevent adding line break when shift+enter pressed
    const submitEvent = new Event('submit', { bubbles: true })
    const parentForm = (e.target as any).form as HTMLFormElement
    parentForm.dispatchEvent(submitEvent)
  }
}
