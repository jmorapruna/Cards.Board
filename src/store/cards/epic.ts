import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { exhaustMap } from 'rxjs/operators'
import { RootState } from '..'
import { loadCardsSuccess } from './actions'
import { CardsActionTypes, LOAD_CARDS } from './types'

const mockCards = [
  { title: 'Card 1', description: 'This is card 1', imageUrl: 'https://www.typescriptlang.org/images/branding/two-colors.svg' },
  { title: 'Card 2', description: 'This is card 2' }
]

export const cardsLoadEpic: Epic<
  CardsActionTypes,
  CardsActionTypes,
  RootState
> = (action$, store) =>
    action$.pipe(
      ofType(LOAD_CARDS),
      exhaustMap(() =>
        of(loadCardsSuccess(mockCards))
      )
    )

const epics = [
  cardsLoadEpic
]

export default epics