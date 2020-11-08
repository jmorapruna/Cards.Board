import { ADD_CARD, CardsActionTypes, CardsState, LOAD_CARDS_SUCCESS } from './types'

const initialState: CardsState = []

export default function (
  state = initialState,
  action: CardsActionTypes
): CardsState {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return [...action.payload]
    case ADD_CARD:
      return [...state, { ...action.payload, id: state.length }]
    default:
      return state
  }
}
