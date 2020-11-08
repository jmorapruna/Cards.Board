import { ICard } from '../../models/card.model'
import { ADD_CARD, CardsActionTypes, LOAD_CARDS, LOAD_CARDS_SUCCESS, EDIT_CARD } from './types'

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

export function addCard(card: ICard): CardsActionTypes {
  return {
    type: ADD_CARD,
    payload: card
  }
}

export function editCard(card: ICard): CardsActionTypes {
  return {
    type: EDIT_CARD,
    payload: card
  }
}