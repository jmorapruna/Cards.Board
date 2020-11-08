import { ICard } from '../../models/card.model'

export type CardsState = ICard[]

export const LOAD_CARDS = 'LOAD_CARDS'
export const LOAD_CARDS_SUCCESS = 'LOAD_CARDS_SUCCESS'

interface LoadCardsAction {
  type: typeof LOAD_CARDS
}

interface LoadCardsSuccessAction {
  type: typeof LOAD_CARDS_SUCCESS
  payload: ICard[]
}

export type CardsActionTypes = LoadCardsAction | LoadCardsSuccessAction
