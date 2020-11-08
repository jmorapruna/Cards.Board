import { applyMiddleware, compose, combineReducers, createStore } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { cardsReducer } from './cards/reducer'
import cardsEpic from './cards/epic'
import { CardsActionTypes } from './cards/types'

const rootReducer = combineReducers({
  cards: cardsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }
}

type ActionsType = CardsActionTypes

const epicMiddleware = createEpicMiddleware<
  ActionsType,
  ActionsType,
  RootState
>()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create store
function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [epicMiddleware]
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  // create store
  return createStore(rootReducer, initialState, enhancer)
}

export const store = configureStore()

const epics = combineEpics(...cardsEpic)
epicMiddleware.run(epics)
