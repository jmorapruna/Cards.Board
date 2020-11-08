import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../components/card.component'
import { loadCards } from '../store/cards/actions'
import { RootState } from '../store'
import { AddCardModal } from '../components/add-card-modal.component'
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

  useEffect(() => {
    dispatch(loadCards())
  }, [dispatch])

  return <div>
    {
      showAddCardModal && <AddCardModal closeModal={() => setShowAddCardModal(false)} />
    }
    {
      cards.map((card, i) => (<Card card={card} key={i} />))
    }

    <OrderingCriteria />

    <Button buttonWasClicked={() => setShowAddCardModal(true)}>Add card</Button>
  </div>
}
