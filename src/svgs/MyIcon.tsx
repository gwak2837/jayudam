import { theme } from '../styles/global'

type Props = {
  selected?: boolean
}

export default function MyIcon({ selected }: Props) {
  return (
    <svg viewBox="0 0 1000 1000">
      <g>
        <path
          d="M499.6,570.6c-154.3,0-279.9-125.8-279.9-280.4C219.6,135.7,345.2,10,499.6,10c154.4,0,280,125.7,280,280.2C779.5,444.8,653.9,570.6,499.6,570.6z M499.6,50.8c-131.9,0-239.1,107.4-239.1,239.4c0,132.1,107.2,239.5,239.1,239.5c131.9,0,239.1-107.4,239.1-239.5C738.7,158.2,631.4,50.8,499.6,50.8z"
          fill={selected ? theme.primary : theme.primaryAchromatic}
        />
        <path
          d="M910.6,990H89.4l35.9-323.6l174.1-69.9c10.5-4.2,22.4,0.9,26.5,11.3c4.2,10.5-0.9,22.4-11.3,26.5l-151.5,60.9l-28.2,254h728.2l-38.1-254.7L678,635.2c-10.5-4.2-15.6-16.1-11.3-26.5c4.2-10.5,16.1-15.5,26.5-11.3l168.9,67.9L910.6,990z"
          fill={selected ? theme.primary : theme.primaryAchromatic}
        />
      </g>
    </svg>
  )
}
