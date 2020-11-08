import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { changeOrderingType, changeOrderingField } from '../store/cards-ordering/actions'

import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineLine } from 'react-icons/ai'
import { OrderingFieldType, OrderingType } from '../models/cards-ordering.model'

const selectCardsOrdering = (state: RootState) => state.cardsOrdering

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
    <div>
      <div onClick={() => handleToggleOrdering(OrderingFieldType.ByTitle)}>
        {
          isFieldTitle
            ? <Icon />
            : <AiOutlineLine />
        }
        <span>Title</span>
      </div>

      <div onClick={() => handleToggleOrdering(OrderingFieldType.ByDescription)}>
        {
          !isFieldTitle
            ? <Icon />
            : <AiOutlineLine />
        }
        <span>Description</span>
      </div>
    </div>
  )
}
