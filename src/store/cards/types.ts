import { ICard } from '../../models/card.model'

export type CardsState = ICard[]

export const LOAD_CARDS = 'LOAD_CARDS'
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS'
export const ADD_CARD = 'ADD_CARD'
export const EDIT_CARD = 'EDIT_CARD'

interface LoadCardsAction {
  type: typeof LOAD_CARDS
}

interface LoadCardsSuccessAction {
  type: typeof LOAD_CARDS_SUCCESS
  payload: ICard[]
}

interface AddCardAction {
  type: typeof ADD_CARD
  payload: ICard
}

interface EditCardAction {
  type: typeof EDIT_CARD
  payload: ICard
}

export type CardsActionTypes = LoadCardsAction | LoadCardsSuccessAction | AddCardAction | EditCardAction
