import { theme } from 'src/styles/global'

type Props = {
  selected?: boolean
}

export default function VerifyIcon({ selected }: Props) {
  return (
    <svg viewBox="0 0 512 512">
      <g>
        <path
          d="M501.7,225.7L467,183.1c-5.5-7.1-8.7-15-10.2-24.4l-6.3-54.4c-2.4-22.1-20.5-40.2-42.5-42.5
            l-54.4-6.3c-9.5-0.8-18.1-4.7-25.2-10.2l-42.5-34.7c-17.3-14.2-42.5-14.2-59.9,0l-42.5,34.7c-7.1,5.5-15,8.7-24.4,10.2l-54.4,6.3
            c-22.1,2.4-40.2,20.5-42.5,42.5l-6.3,54.4c-0.8,9.5-4.7,18.1-10.2,25.2l-34.7,42.5c-14.2,17.3-14.2,42.5,0,59.9l34.7,42.5
            c5.5,7.1,8.7,15,10.2,24.4l6.3,54.4c2.4,22.1,20.5,40.2,42.5,42.5l54.4,6.3c9.5,0.8,18.1,4.7,25.2,10.2l42.5,34.7
            c17.3,14.2,42.5,14.2,59.9,0l42.5-34.7c7.1-5.5,15-8.7,24.4-10.2l54.4-6.3c22.1-2.4,40.2-20.5,42.5-42.5l6.3-54.4
            c0.8-9.5,4.7-18.1,10.2-25.2l34.7-42.5C515.1,268.2,515.1,243,501.7,225.7z M207.9,384L96,272.1l48-48l63.8,63.8L367.8,128l48,49.6
            L207.9,384z"
          fill={selected ? theme.primary : theme.primaryAchromatic}
        />
      </g>
    </svg>
  )
}