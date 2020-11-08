import React from 'react'
import { useDispatch } from 'react-redux'
import { ICard } from '../models/card.model'
import { deleteCardById } from '../store/cards/actions'

export type CardComponentProps = {
  card: ICard
}

export const Card: React.FC<CardComponentProps> = ({ card }) => {
  const dispatch = useDispatch()
  let { title, description, imageUrl } = card

  imageUrl = imageUrl || process.env.PUBLIC_URL + '/images/default-card-image.jpg'

  return <div>
    <img src={imageUrl} alt={title} />
    <p>{title}</p>
    <p>{description}</p>
    <p onClick={() => dispatch(deleteCardById(card.id as number))}>Delete</p>
  </div>
}
