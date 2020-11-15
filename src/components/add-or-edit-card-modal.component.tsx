import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ICard } from '../models/card.model'
import { addCard, editCard } from '../store/cards/actions'
import { Button } from './button.component'
import { useOutsideClickEffect } from '../hooks/use-outside-click-effect'
import { GrClose } from 'react-icons/gr'

const FIELD_TITLE = 'title'
const FIELD_DESCRIPTION = 'description'
const FIELD_IMAGE_URL = 'imageUrl'

type Props = {
  editedCard?: ICard
  closeModal: () => void
}

const Input = styled.input`
  border: 1px solid transparent;
  height: 40px;
  padding: 10px 16px;
  outline: none;
  border-radius: 8px;
  appearance: none;
  color: #0d0c22;
  background-color: #f3f3f4;
  width: 100%;
  display: block;
  margin-top: 6px;
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 20px;
  }
`

const WrapperDiv = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalDiv = styled.div`
position: relative;
padding: 40px;
background-color: white;
max-width: 560px;
margin: 0 auto;
border-radius: 8px;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const ContentDiv = styled.div`
max-width: 400px;
margin: 0 auto;
`

const ErrorDiv = styled.div`
text-align: center;
color: #d14;
margin-bottom: 16px;
font-weight: 500;
line-height: 22px;
`

const CloseButton = styled.div`
position: absolute;
top: 32px;
right: 30px;
padding: 10px;
cursor: pointer;
`

const ModalTitle = styled.h3`
font-size: 20px;
font-weight: 500;
margin-bottom: 40px;
`

export const AddOrEditCardModal: React.FC<Props> = ({
  editedCard,
  closeModal: onClose = () => { }
}) => {

  const dispatch = useDispatch()
  const modalRef = useRef(null)
  useOutsideClickEffect(modalRef, onClose)

  const [formValue, setFormValue] = useState({
    id: editedCard?.id || '',
    [FIELD_TITLE]: editedCard?.title || '',
    [FIELD_DESCRIPTION]: editedCard?.description || '',
    [FIELD_IMAGE_URL]: editedCard?.imageUrl || ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormValue({
    ...formValue,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const [anyError, setAnyError] = useState(false)

  const handleAddOrEditButtonClick = () => {
    const anyError = !formValue[FIELD_TITLE] || !formValue[FIELD_DESCRIPTION]
    setAnyError(anyError)

    if (!anyError) {

      if (editedCard)
        dispatch(editCard({
          id: editedCard?.id,
          title: formValue[FIELD_TITLE],
          description: formValue[FIELD_DESCRIPTION],
          imageUrl: formValue[FIELD_IMAGE_URL]
        }))
      else
        dispatch(addCard({
          title: formValue[FIELD_TITLE],
          description: formValue[FIELD_DESCRIPTION],
          imageUrl: formValue[FIELD_IMAGE_URL]
        }))

      onClose()
    }
  }

  const buttonText = editedCard
    ? 'Save card'
    : 'Add card'

  const titleText = editedCard
    ? 'Edit card'
    : 'Add a card'

  return (
    <WrapperDiv>
      <ModalDiv ref={modalRef}>

        <CloseButton onClick={onClose}>
          <GrClose />
        </CloseButton>

        <ContentDiv>
          <ModalTitle>{titleText}</ModalTitle>

          <p>Title *</p>
          <Input type='text' autoComplete='off' value={formValue[FIELD_TITLE]} name={FIELD_TITLE} onChange={handleInputChange} />

          <p>Description *</p>
          <Input type='text' autoComplete='off' value={formValue[FIELD_DESCRIPTION]} name={FIELD_DESCRIPTION} onChange={handleInputChange} />

          <p>Image URL</p>
          <Input type='text' autoComplete='off' value={formValue[FIELD_IMAGE_URL]} name={FIELD_IMAGE_URL} onChange={handleInputChange} />

          {
            anyError && <ErrorDiv>
              <p>Both title and description are required.</p>
              <p>Please make sure to fill them properly.</p>
            </ErrorDiv>
          }

          <Button onClick={handleAddOrEditButtonClick}>{buttonText}</Button>
        </ContentDiv>
      </ModalDiv>
    </WrapperDiv>
  )
}
