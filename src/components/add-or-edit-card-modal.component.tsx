import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ICard } from '../models/card.model'
import { addCard, editCard } from '../store/cards/actions'
import { Button } from './button.component'

const FIELD_TITLE = 'title'
const FIELD_DESCRIPTION = 'description'
const FIELD_IMAGE_URL = 'imageUrl'

type Props = {
  editedCard?: ICard
  closeModal: () => void
}

export const AddOrEditCardModal: React.FC<Props> = ({ editedCard, closeModal = () => { } }) => {
  const dispatch = useDispatch()

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

  const handleAddCard = () => {
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

      closeModal()
    }
  }

  const buttonText = editedCard
    ? 'Save card'
    : 'Add card'

  return (
    <div>
      { JSON.stringify(editedCard)}
      <input type='text' autoComplete='off' value={formValue[FIELD_TITLE]} name={FIELD_TITLE} onChange={handleInputChange} />
      <input type='text' autoComplete='off' value={formValue[FIELD_DESCRIPTION]} name={FIELD_DESCRIPTION} onChange={handleInputChange} />
      <input type='text' autoComplete='off' value={formValue[FIELD_IMAGE_URL]} name={FIELD_IMAGE_URL} onChange={handleInputChange} />

      {
        anyError && <p>Both title and description are required. Please make sure to fill them properly.</p>
      }

      <Button
        isDisabled={anyError}
        buttonWasClicked={handleAddCard}>{buttonText}</Button>
    </div>
  )
}
