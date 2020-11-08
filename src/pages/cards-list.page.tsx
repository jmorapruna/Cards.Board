import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../components/card.component'
import { loadCards } from '../store/cards/actions'
import { RootState } from '../store'
import { AddOrEditCardModal } from '../components/add-or-edit-card-modal.component'
import { Button } from '../components/button.component'
import { OrderingFieldType, OrderingType } from '../models/cards-ordering.model'
import { OrderingCriteria } from '../components/ordering-criteria.component'
import { ICard } from '../models/card.model'

const selectOrderedCards = (state: RootState) => {
  const { cards, cardsOrdering } = state

  let sortedCards: ICard[] = []
  if (cardsOrdering.field === OrderingFieldType.ByTitle)
    sortedCards = cardsOrdering.order === OrderingType.AscendingOrder
      ? cards.sort((a, b) => a.title.localeCompare(b.title))
      : cards.sort((a, b) => b.title.localeCompare(a.title))
  else
    sortedCards = cardsOrdering.order === OrderingType.AscendingOrder
      ? cards.sort((a, b) => a.description.localeCompare(b.description))
      : cards.sort((a, b) => b.description.localeCompare(a.description))

  return [...sortedCards]
}

export const CardsListPage = () => {
  const dispatch = useDispatch()
  const cards = useSelector(selectOrderedCards)

  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [editedCard, setEditedCard] = useState<ICard | undefined>(undefined)

  useEffect(() => {
    dispatch(loadCards())
  }, [dispatch])

  return <div>
    {
      showAddCardModal && <AddOrEditCardModal closeModal={() => setShowAddCardModal(false)} />
    }

    {
      editedCard !== undefined && <AddOrEditCardModal editedCard={editedCard} closeModal={() => setEditedCard(undefined)} />
    }

    {
      cards.map(card => (
        <div key={card.id}>
          <Card card={card} />
          <p onClick={() => editedCard === undefined && setEditedCard(card)}>Edit</p>
        </div>
      ))
    }

    <OrderingCriteria />

    <Button buttonWasClicked={() => setShowAddCardModal(true)}>Add card</Button>
  </div>
}
