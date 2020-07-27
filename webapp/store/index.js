import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { UsersEpics, UsersReducer, UsersState } from './users'

const rootReducer = combineReducers({
  [UsersState.stateKey]: UsersReducer,
})
const rootEpic = combineEpics(UsersEpics.fetchUsers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware()
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)))
epicMiddleware.run(rootEpic)

export default store
