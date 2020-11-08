import { OrderingFieldType, OrderingType } from '../../models/cards-ordering.model'
import { CardsOrderingState, CardsOrderingActionTypes, CHANGE_ORDERING_FIELD, CHANGE_ORDERING_TYPE } from './types'

const initialState: CardsOrderingState = {
  field: OrderingFieldType.ByTitle,
  order: OrderingType.AscendingOrder
}

export default function(
  state = initialState,
  action: CardsOrderingActionTypes
): CardsOrderingState {
  switch (action.type) {
    case CHANGE_ORDERING_FIELD:
      return {
        ...state,
        field: action.payload
      }
    case CHANGE_ORDERING_TYPE:
      return {
        ...state,
        order: action.payload
      }
    default:
      return state
  }
}
