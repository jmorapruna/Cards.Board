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
import styled from 'styled-components'

const Page = styled.div`
padding-top: 20px;
padding-bottom: 100px;
`

const CardsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const AddButtonWrapper = styled.div`
position: fixed;
bottom: 0;
left: 0;
right: 0;
display: flex;
justify-content: center;
background-color: #f6f4f4;
height: 100px;
padding-top: 30px;
`

const EmptyMessage = styled.div`
margin-top: 100px;
font-size: 26px;
text-align: center;
line-height: 40px;
`

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
  const anyCard = cards.length > 0

  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [editedCard, setEditedCard] = useState<ICard | undefined>(undefined)

  useEffect(() => {
    dispatch(loadCards())
  }, [dispatch])

  return <Page>
    {
      anyCard
        ? <OrderingCriteria />
        : <EmptyMessage>
          <p>This looks so empty!</p>
          <p>You can add a card using the add button.</p>
        </EmptyMessage>
    }

    {
      showAddCardModal && <AddOrEditCardModal closeModal={() => setShowAddCardModal(false)} />
    }

    {
      editedCard && <AddOrEditCardModal editedCard={editedCard} closeModal={() => setEditedCard(undefined)} />
    }

    <CardsWrapper>
      {
        cards.map(card => (
          <Card card={card} editButtonWasClicked={() => !editedCard && setEditedCard(card)} key={card.id} />
        ))
      }
    </CardsWrapper>

    <AddButtonWrapper>
      <Button buttonWasClicked={() => setShowAddCardModal(true)} width='200px'>
        Add a card
      </Button>
    </AddButtonWrapper>

  </Page>
}
