import { combineReducers } from 'redux'
import queries from './queries'
import results from './results'

const rootReducer = combineReducers({
  queries,
  results
})

export default rootReducer
