import { ICard } from '../../models/card.model'
import { CardsActionTypes, LOAD_CARDS, LOAD_CARDS_SUCCESS } from './types'

export function loadCards(): CardsActionTypes {
  return {
    type: LOAD_CARDS,
  }
}

export function loadCardsSuccess(cards: ICard[]): CardsActionTypes {
  return {
    type: LOAD_CARDS_SUCCESS,
    payload: cards
  }
}
