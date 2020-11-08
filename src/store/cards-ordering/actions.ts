import { OrderingFieldType, OrderingType } from '../../models/cards-ordering.model'
import { CardsOrderingActionTypes, CHANGE_ORDERING_TYPE, CHANGE_ORDERING_FIELD } from './types'

export function changeOrderingType(orderingType: OrderingType): CardsOrderingActionTypes {
  return {
    type: CHANGE_ORDERING_TYPE,
    payload: orderingType
  }
}

export function changeOrderingField(orderingField: OrderingFieldType): CardsOrderingActionTypes {
  return {
    type: CHANGE_ORDERING_FIELD,
    payload: orderingField
  }
}
