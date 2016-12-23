import axios from 'axios'
import { browserHistory } from 'react-router'

// Initial State for Queries
const initialResults = []

// -=-=-=-= ACTIONS =-=-=-=-=-

const ADD_RESULT = 'ADD_RESULT'
const REMOVE_RESULT = 'REMOVE_RESULT'

// -=-=-=-= ACTION-CREATORS =-=-=-=-=-

export const addResult = (result) => ({
  type: ADD_RESULT,
  result
})

export const removeResult = (id) => ({
  type: REMOVE_RESULT,
  id
})

// -=-=-=-= DISPATCHERS =-=-=-=-

// remove a result
export const resultDestroyer = (queryId, resultId) => (dispatch) => {
  dispatch(removeResult(resultId))  // remove result from presentational state
  axios.delete(`/api/queries/${queryId}/results/${resultId}`)  // delete from db
    .then()
    .catch(err => console.error(err))
}

// -=-=-=-= REDUCER =-=-=-=-=-

const resultReducer = (state = initialResults, action) => {
  switch(action.type) {
    case ADD_RESULT:
      return [action.result, ...state]
    case REMOVE_RESULT:
      return state.filter(result => (result.id !== action.id))
    default: return state
  }
}

export default resultReducer
