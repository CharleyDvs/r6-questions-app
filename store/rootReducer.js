import { formsReducer } from './formsReducer'
import { userReducer } from './userReducer'
import { combineReducers } from 'redux'

export const reducers = combineReducers({
  forms: formsReducer,
  user: userReducer,
})
