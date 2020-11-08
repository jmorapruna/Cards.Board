import { CardsActionTypes, CardsState, LOAD_CARDS_SUCCESS } from './types'

const initialState: CardsState = []

export function cardsReducer(
  state = initialState,
  action: CardsActionTypes
): CardsState {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return [...action.payload]
    default:
      return state
  }
}
