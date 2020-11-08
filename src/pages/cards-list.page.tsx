import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../components/card.component'
import { loadCards } from '../store/cards/actions'
import { RootState } from '../store'
import { AddCardModal } from '../components/add-card-modal.component'
import { Button } from '../components/button.component'

const selectCards = (state: RootState) => state.cards

export const CardsListPage = () => {
  const dispatch = useDispatch()
  const cards = useSelector(selectCards)

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

    <Button buttonWasClicked={() => setShowAddCardModal(true)}>Add card</Button>
  </div>
}
