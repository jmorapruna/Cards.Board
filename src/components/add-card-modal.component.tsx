import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCard } from '../store/cards/actions'
import { Button } from './button.component'

const FIELD_TITLE = 'title'
const FIELD_DESCRIPTION = 'description'
const FIELD_IMAGE_URL = 'imageUrl'

type Props = {
  closeModal: () => void
}

export const AddCardModal: React.FC<Props> = ({ closeModal = () => { } }) => {
  const dispatch = useDispatch()

  const [formValue, setFormValue] = useState({
    [FIELD_TITLE]: '',
    [FIELD_DESCRIPTION]: '',
    [FIELD_IMAGE_URL]: ''
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
      dispatch(addCard({
        title: formValue[FIELD_TITLE],
        description: formValue[FIELD_DESCRIPTION],
        imageUrl: formValue[FIELD_IMAGE_URL]
      }))

      closeModal()
    }
  }

  return (
    <div>
      <input type='text' autoComplete='off' value={formValue[FIELD_TITLE]} name={FIELD_TITLE} onChange={handleInputChange} />
      <input type='text' autoComplete='off' value={formValue[FIELD_DESCRIPTION]} name={FIELD_DESCRIPTION} onChange={handleInputChange} />
      <input type='text' autoComplete='off' value={formValue[FIELD_IMAGE_URL]} name={FIELD_IMAGE_URL} onChange={handleInputChange} />

      {
        anyError && <p>Both title and description are required. Please make sure to fill them properly.</p>
      }

      <Button
        isDisabled={anyError}
        buttonWasClicked={handleAddCard}>Add card</Button>
    </div>
  )
}
