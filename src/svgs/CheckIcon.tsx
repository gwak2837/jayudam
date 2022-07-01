import { theme } from 'src/styles/global'

function CheckIcon() {
  return (
    <svg viewBox="0 0 11.442 9.42">
      <path
        d="M1.044 4.01l3.239 4.66 6.1-7.616"
        fill="none"
        stroke={theme.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default CheckIcon
