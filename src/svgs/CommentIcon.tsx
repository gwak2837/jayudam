import { theme } from 'src/styles/global'

type Props = {
  selected?: boolean
}

export default function CommentIcon({ selected }: Props) {
  return (
    <svg viewBox="0 -256 1850 1850">
      <g transform="matrix(1,0,0,-1,22.779661,1183.966)">
        <path
          d="M 896,1152 Q 692,1152 514.5,1082.5 337,1013 232.5,895 128,777 128,640 128,528 199.5,426.5 271,325 401,251 l 87,-50 -27,-96 Q 437,14 391,-67 543,-4 666,104 l 43,38 57,-6 q 69,-8 130,-8 204,0 381.5,69.5 177.5,69.5 282,187.5 104.5,118 104.5,255 0,137 -104.5,255 -104.5,118 -282,187.5 Q 1100,1152 896,1152 z M 1792,640 Q 1792,466 1672,318.5 1552,171 1346,85.5 1140,0 896,0 826,0 751,8 553,-167 291,-234 242,-248 177,-256 h -5 q -15,0 -27,10.5 -12,10.5 -16,27.5 v 1 q -3,4 -0.5,12 2.5,8 2,10 -0.5,2 4.5,9.5 l 6,9 q 0,0 7,8.5 7,8.5 8,9 7,8 31,34.5 24,26.5 34.5,38 10.5,11.5 31,39.5 20.5,28 32.5,51 12,23 27,59 15,36 26,76 Q 181,228 90.5,359 0,490 0,640 q 0,174 120,321.5 120,147.5 326,233 206,85.5 450,85.5 244,0 450,-85.5 206,-85.5 326,-233 Q 1792,814 1792,640 z"
          fill={selected ? theme.primaryText : theme.primaryTextAchromatic}
        />
      </g>
    </svg>
  )
}
