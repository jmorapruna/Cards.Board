import React from 'react'
import styled from 'styled-components'

type Props = {
  isDisabled?: boolean
  buttonWasClicked: () => void
  backgroundColor?: string
  width?: string
}

const StyledDiv = styled.div`
height: 40px;
line-height: 40px;
color: white;
text-align: center;
border-radius: 5px;
font-weight: 600;
font-size: 18px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
display: inline-block;
`

export const Button: React.FC<Props> = ({
  children,
  buttonWasClicked,
  isDisabled = false,
  backgroundColor = '#50d890',
  width = '100%'
}) => {
  return (
    <StyledDiv
      style={{ width, backgroundColor }}
      onClick={() => !isDisabled && buttonWasClicked()}>
      {children}
    </StyledDiv>
  )
}
