import { useState } from 'react'
import styled from 'styled-components'

export const answerColors = [
  'hsl(0, 75%, 50%)',
  'hsl(45, 75%, 50%)',
  'hsl(90, 75%, 50%)',
  'hsl(135, 75%, 50%)',
  'hsl(180, 75%, 50%)',
  'hsl(225, 75%, 50%)',
  'hsl(270, 75%, 50%)',
]

const FlexOl = styled.ol`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  overflow: scroll;
  scrollbar-color: transparent transparent;
  scrollbar-width: 0px;
  /* ::-webkit-scrollbar {
    height: 0;
  } */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border: none;
  }
`

const Label = styled.label<{ isChecked: boolean; index: number }>`
  display: block;
  position: relative;
  width: min(max(24px, 8vw), 40px);
  height: min(max(24px, 8vw), 40px);

  border: min(max(5px, 1.5vw), 7px) solid ${(p) => (p.isChecked ? answerColors[p.index] : '#ccc')};
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s ease-out;

  :hover {
    border-color: ${(p) => answerColors[p.index]};
  }
`

const Circle = styled.div<{ isChecked: boolean; index: number }>`
  position: absolute;
  inset: min(max(4px, 1vw), 7px);

  background: ${(p) => (p.isChecked ? answerColors[p.index] : '#f0f0f0')};
  border-radius: 100%;

  transition: all 0.3s ease-out;
`

const NoneInput = styled.input`
  display: none;
`

type Props = {
  selected: number | undefined
  onSelected: (selected: number) => void
  questionId: string
}

function SingleSelections({ selected, onSelected, questionId }: Props) {
  const [internalSelected, setInternalSelected] = useState(selected)

  return (
    <FlexOl>
      {[0, 1, 2, 3, 4, 5, 6].map((answer) => (
        <li key={answer}>
          <Label
            htmlFor={`${questionId}-${answer}`}
            index={answer}
            isChecked={internalSelected === answer}
          >
            <NoneInput
              id={`${questionId}-${answer}`}
              type="checkbox"
              onChange={() => {
                onSelected(answer)
                setInternalSelected(answer)
              }}
            />
            <Circle index={answer} isChecked={internalSelected === answer} />
          </Label>
        </li>
      ))}
    </FlexOl>
  )
}

export default SingleSelections
