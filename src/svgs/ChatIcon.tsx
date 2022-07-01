import { theme } from 'src/styles/global'

type Props = {
  selected: boolean
}

function ChatIcon({ selected }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {selected ? (
        <>
          <path
            d="M1.5 12V3C1.5 2.44772 1.94772 2 2.5 2H14.5C15.0523 2 15.5 2.44771 15.5 3V12C15.5 12.5523 15.0523 13 14.5 13H8.5L6.20711 15.2929C5.57714 15.9229 4.5 15.4767 4.5 14.5858V13H2.5C1.94772 13 1.5 12.5523 1.5 12Z"
            fill={theme.primary}
          />
          <path
            d="M17.5 6.5C17.2239 6.5 17 6.72386 17 7C17 7.27614 17.2239 7.5 17.5 7.5V6.5ZM19.5 18V17.5H19V18H19.5ZM15.5 18L15.8536 17.6464L15.7071 17.5H15.5V18ZM10 15C10 14.7239 9.77614 14.5 9.5 14.5C9.22386 14.5 9 14.7239 9 15H10ZM17.5 7.5H21.5V6.5H17.5V7.5ZM22 8V17H23V8H22ZM21.5 17.5H19.5V18.5H21.5V17.5ZM19 18V19.5858H20V18H19ZM18.1464 19.9393L15.8536 17.6464L15.1464 18.3536L17.4393 20.6464L18.1464 19.9393ZM15.5 17.5H10.5V18.5H15.5V17.5ZM10 17V15H9V17H10ZM19 19.5858C19 20.0312 18.4614 20.2543 18.1464 19.9393L17.4393 20.6464C18.3843 21.5914 20 20.9221 20 19.5858H19ZM22 17C22 17.2761 21.7761 17.5 21.5 17.5V18.5C22.3284 18.5 23 17.8284 23 17H22ZM10.5 17.5C10.2239 17.5 10 17.2761 10 17H9C9 17.8284 9.67157 18.5 10.5 18.5V17.5ZM21.5 7.5C21.7761 7.5 22 7.72386 22 8H23C23 7.17157 22.3284 6.5 21.5 6.5V7.5Z"
            fill={theme.primary}
          />
        </>
      ) : (
        <path
          d="M4.5 13H5V12.5H4.5V13ZM8.5 13V12.5H8.29289L8.14645 12.6464L8.5 13ZM17.5 6.5C17.2239 6.5 17 6.72386 17 7C17 7.27614 17.2239 7.5 17.5 7.5V6.5ZM19.5 18V17.5H19V18H19.5ZM15.5 18L15.8536 17.6464L15.7071 17.5H15.5V18ZM10 15C10 14.7239 9.77614 14.5 9.5 14.5C9.22386 14.5 9 14.7239 9 15H10ZM6.20711 15.2929L6.56066 15.6464L6.20711 15.2929ZM17.7929 20.2929L17.4393 20.6464L17.7929 20.2929ZM1 3V12H2V3H1ZM2.5 13.5H4.5V12.5H2.5V13.5ZM4 13V14.5858H5V13H4ZM6.56066 15.6464L8.85355 13.3536L8.14645 12.6464L5.85355 14.9393L6.56066 15.6464ZM8.5 13.5H14.5V12.5H8.5V13.5ZM16 12V3H15V12H16ZM14.5 1.5H2.5V2.5H14.5V1.5ZM17.5 7.5H21.5V6.5H17.5V7.5ZM22 8V17H23V8H22ZM21.5 17.5H19.5V18.5H21.5V17.5ZM19 18V19.5858H20V18H19ZM18.1464 19.9393L15.8536 17.6464L15.1464 18.3536L17.4393 20.6464L18.1464 19.9393ZM15.5 17.5H10.5V18.5H15.5V17.5ZM10 17V15H9V17H10ZM10.5 17.5C10.2239 17.5 10 17.2761 10 17H9C9 17.8284 9.67157 18.5 10.5 18.5V17.5ZM22 17C22 17.2761 21.7761 17.5 21.5 17.5V18.5C22.3284 18.5 23 17.8284 23 17H22ZM21.5 7.5C21.7761 7.5 22 7.72386 22 8H23C23 7.17157 22.3284 6.5 21.5 6.5V7.5ZM4 14.5858C4 15.9221 5.61571 16.5914 6.56066 15.6464L5.85355 14.9393C5.53857 15.2543 5 15.0312 5 14.5858H4ZM16 3C16 2.17157 15.3284 1.5 14.5 1.5V2.5C14.7761 2.5 15 2.72386 15 3H16ZM1 12C1 12.8284 1.67157 13.5 2.5 13.5V12.5C2.22386 12.5 2 12.2761 2 12H1ZM14.5 13.5C15.3284 13.5 16 12.8284 16 12H15C15 12.2761 14.7761 12.5 14.5 12.5V13.5ZM19 19.5858C19 20.0312 18.4614 20.2543 18.1464 19.9393L17.4393 20.6464C18.3843 21.5914 20 20.9221 20 19.5858H19ZM2 3C2 2.72386 2.22386 2.5 2.5 2.5V1.5C1.67157 1.5 1 2.17157 1 3H2Z"
          fill={theme.primary}
        />
      )}
    </svg>
  )
}

export default ChatIcon
