import React from 'react'
import { ICard } from '../models/card.model'

export type CardComponentProps = {
  card: ICard
}

export const Card: React.FC<CardComponentProps> = ({ card }) => {
  let { title, description, imageUrl } = card

  imageUrl = imageUrl || process.env.PUBLIC_URL + '/images/default-card-image.jpg'

  return <div>
    <img src={imageUrl} alt={title} />
    <p>{title}</p>
    <p>{description}</p>
  </div>
}
