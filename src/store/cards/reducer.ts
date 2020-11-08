import { ADD_CARD, CardsActionTypes, CardsState, EDIT_CARD, LOAD_CARDS_SUCCESS } from './types'

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
    case EDIT_CARD: {
      const newState = state.map(card =>
        card.id === action.payload.id
          ? { ...action.payload }
          : card
      )

      return newState
    }
    default:
      return state
  }
}
