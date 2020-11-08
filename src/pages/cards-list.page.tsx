import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../components/card.component'
import { loadCards } from '../store/cards/actions'
import { RootState } from '../store'


const selectCards = (state: RootState) => state.cards

export const CardsListPage = () => {
  const dispatch = useDispatch()
  const cards = useSelector(selectCards)

  useEffect(() => {
    dispatch(loadCards())
  }, [dispatch])

  return <div>
    {
      cards.map((card, i) => (<Card card={card} key={i} />))
    }
  </div>
}
