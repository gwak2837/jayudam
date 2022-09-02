import styled from 'styled-components'

export const AutoTextarea_ = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 2.5rem;
  max-height: 80vh;
  padding: 0.5rem;
  resize: vertical;

  flex: 1;

  :focus {
    outline: none;
  }
`
