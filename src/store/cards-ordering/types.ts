import { ICardsOrdering, OrderingFieldType, OrderingType } from '../../models/cards-ordering.model'

export type CardsOrderingState = ICardsOrdering

export const CHANGE_ORDERING_TYPE = 'CHANGE_ORDERING_TYPE'
export const CHANGE_ORDERING_FIELD = 'CHANGE_ORDERING_FIELD'

interface ChangeOrderingType {
  type: typeof CHANGE_ORDERING_TYPE
  payload: OrderingType
}

interface ChangeOrderingField {
  type: typeof CHANGE_ORDERING_FIELD
  payload: OrderingFieldType
}

export type CardsOrderingActionTypes = ChangeOrderingType | ChangeOrderingField
