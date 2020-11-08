import React from 'react'
import { ICard } from '../models/card.model'
import { Card } from '../components/card.component'

export const CardsListPage = () => {
  const cards: ICard[] = [
    { title: 'Card 1', description: 'This is card 1', imageUrl: 'https://www.typescriptlang.org/images/branding/two-colors.svg' },
    { title: 'Card 2', description: 'This is card 2' }
  ]

  return <div>
    {
      cards.map(card => (<Card card={card} />))
    }
  </div>
}
