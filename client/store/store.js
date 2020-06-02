/* eslint-disable camelcase */
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import daysReducer from './days'
import userReducer from './user'
import groceryBankReducer from './groceryBank'
import mealsReducer from './meals'
import ingredientsReducer from './ingredients'
import totalReducer from './total'

const reducer = combineReducers({
  user: userReducer,
  days: daysReducer,
  grocery_bank: groceryBankReducer,
  meals: mealsReducer,
  ingredients: ingredientsReducer,
  total: totalReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
