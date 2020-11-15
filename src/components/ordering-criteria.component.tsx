import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { changeOrderingType, changeOrderingField } from '../store/cards-ordering/actions'

import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { OrderingFieldType, OrderingType } from '../models/cards-ordering.model'
import { Button } from './button.component'
import styled from 'styled-components'

const selectCardsOrdering = (state: RootState) => state.cardsOrdering

const OrderingButtons = styled.div`
display: flex;
justify-content: center;
align-content: center;

& > * {
  margin: 0 5px;
}
`

export const OrderingCriteria = () => {
  const dispatch = useDispatch()
  const { field, order } = useSelector(selectCardsOrdering)

  const isFieldTitle = field === OrderingFieldType.ByTitle
  const isOrderAscending = order === OrderingType.AscendingOrder

  const Icon = isOrderAscending
    ? AiOutlineSortAscending
    : AiOutlineSortDescending

  const handleToggleOrdering = (newFieldType: OrderingFieldType) => {
    if (field === newFieldType) {
      if (isOrderAscending)
        dispatch(changeOrderingType(OrderingType.DescendingOrder))
      else
        dispatch(changeOrderingType(OrderingType.AscendingOrder))

      return
    }

    if (isFieldTitle)
      dispatch(changeOrderingField(OrderingFieldType.ByDescription))
    else
      dispatch(changeOrderingField(OrderingFieldType.ByTitle))
  }

  return (
    <OrderingButtons>
      <Button onClick={() => handleToggleOrdering(OrderingFieldType.ByTitle)} width='140px' backgroundColor='#e09546'>
        <span>
          {
            isFieldTitle && <Icon />
          }
        </span>
        <span>Title</span>
      </Button>

      <Button onClick={() => handleToggleOrdering(OrderingFieldType.ByDescription)} width='140px' backgroundColor='#e09546'>
        <span>
          {
            !isFieldTitle && <Icon />
          }
        </span>
        <span>Description</span>
      </Button>
    </OrderingButtons>
  )
}
