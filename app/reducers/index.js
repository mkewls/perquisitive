import axios from 'axios'
import { browserHistory } from 'react-router'

// Initial State for Queries
const initialState = {
  queries: []
}

// -=-=-=-= ACTIONS =-=-=-=-=-

const ADD_QUERY = 'ADD_QUERY'
const REMOVE_QUERY = 'REMOVE_QUERY'
const LOAD_QUERIES = 'LOAD_QUERIES'

const ADD_RESULT = 'ADD_RESULT'
const REMOVE_RESULT = 'REMOVE_RESULT'

// -=-=-=-= ACTION-CREATORS =-=-=-=-=-

export const addQuery = (query) => ({
  type: ADD_QUERY,
  query
})

export const removeQuery = (id) => ({
  type: REMOVE_QUERY,
  id
})

export const loadQueries = (queries) => ({
  type: LOAD_QUERIES,
  queries
})

export const addResult = (result) => ({
  type: ADD_RESULT,
  result
})

export const removeResult = (id) => ({
  type: REMOVE_RESULT,
  id
})

// -=-=-=-= DISPATCHER =-=-=-=-

export const postResult = (queryId, tweet) => (dispatch) => {
  axios.post(`/api/results/${queryId}`, tweet)
  .then(result => { dispatch(addResult(result.data)) })
  .catch(err => console.error(err))
}

// -=-=-=-= REDUCER =-=-=-=-=-

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_QUERY:
      return Object.assign({}, state, { queries: [action.query, ...state.queries] })
    case REMOVE_QUERY:
      return Object.assign({}, { queries: state.queries.filter(query => {
        if (query.id !== action.id) return query })
      })
    case LOAD_QUERIES:
      return Object.assign({}, state, { queries: action.queries })
    case ADD_RESULT:
      return Object.assign({}, state, { queries: {
        results: [...state.queries.results, action.result]
      }})
    case REMOVE_RESULT:
      return Object.assign({}, state, { queries: {
        results: state.queries.results.filter(result => {
          if (result.index !== result.id) {
            return result
          }})
      }})
    default: return state
  }
}

export default rootReducer
