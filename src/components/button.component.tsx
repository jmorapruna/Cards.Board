import React from 'react'
import styled from 'styled-components'

type Props = {
  isDisabled?: boolean
  buttonWasClicked: () => void
}

const StyledDiv = styled.div`
  height: 40px;
  line-height: 40px;
  background-color: #50d890;
  color: white;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button: React.FC<Props> = ({ children, isDisabled = false, buttonWasClicked }) => {
  return (
    <StyledDiv
      onClick={() => !isDisabled && buttonWasClicked()}>
      {children}
    </StyledDiv>
  )
}
