import axios from 'axios'
import { browserHistory } from 'react-router'

// Initial State for Queries
const initialQueries = []

// -=-=-=-= ACTIONS =-=-=-=-=-

const REMOVE_QUERY = 'REMOVE_QUERY'
const LOAD_QUERIES = 'LOAD_QUERIES'

// -=-=-=-= ACTION-CREATORS =-=-=-=-=-

export const removeQuery = (id) => ({
  type: REMOVE_QUERY,
  id
})

export const loadQueries = (queries) => ({
  type: LOAD_QUERIES,
  queries
})

// -=-=-=-= DISPATCHERS =-=-=-=-=-

// fetch all queries
export const fetchQueries = () => (dispatch) => {
  axios.get('/api/queries')
    .then(queries => {
      let fetchedQueries = queries.data
        .sort((x,y) => {
          return y.id - x.id  // sort by most recent
        })
        .map(query => {
          query.handles = query.handles
            .split(',')
            .map(handle => {
              return `@${handle}`
            })
            .join(', ')
          query.terms = query.terms.join(', ')

          return query
        })
      return dispatch(loadQueries(fetchedQueries))
    })
    .catch(err => console.error(err))
}

// destroy a query and all its results
export const queryDestroyer = (queryId) => (dispatch) => {
  dispatch(removeQuery(queryId))
  axios.delete(`/api/queries/${queryId}`)
  .then()
  .catch(err => console.error(err))
}

// -=-=-=-= REDUCER =-=-=-=-=-

const queryReducer = (state = initialQueries, action) => {
  switch(action.type) {
    case REMOVE_QUERY:
      return state.filter(query => (query.id !== action.id))
    case LOAD_QUERIES:
      return action.queries
    default: return state
  }
}

export default queryReducer
