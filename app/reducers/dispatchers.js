import axios from 'axios'
import { browserHistory } from 'react-router'
import { addQuery, loadQueries, removeQuery, removeResult } from './index'
import { getIds, streamFilter } from '../../server/twitterAPI'

// -=-=-=-= DISPATCHERS =-=-=-=-=-

// -=-= CREATE =-=-

// START HERE ==> 1/ query received from user and formatted
export const formatQuery = (query) => (dispatch) => {
  // format twitter handles...
  let handles = query.handles.includes(',') ?
    query.handles.split(',') : query.handles.split(' ')  // make array
  handles = handles.map(handle => {
    if (handle.charAt(0) === '@') return handle.slice(1) // slice off '@'
  })
  handles = handles.join(',')  // return to string format with commas for twitter api
  // ...to get twitter user ids
  // TODO
  //const userIds = getIds(handles)  // query twitter api via getIds()

  // format terms
  let terms = query.terms.includes(',') ?
    query.terms : query.terms.split(' ').join(',')

  const formattedQuery = {
    title: query.title,
    handles: handles,
    terms: terms,
    phone: query.phone
  }
  dispatch(postQuery(formattedQuery))
}

// 2/ formatted query is added to the database, then dispatched to
// the TwitterAPI and to the Redux Store for rendering on the page
export const postQuery = (formattedQuery) => (dispatch) => {
  axios.post('/api/queries', formattedQuery)
    .then(query => {
      let storedQuery = {
          id: query.data.id,
          title: query.data.title,
          handles: query.data.handles,
          terms: query.data.terms,
          phone: query.data.phone
        }
      // TODO dispatch(streamFilter(storedQuery.userIds, storedQuery.terms))
      dispatch(addQuery(storedQuery))
    })
    .then(() => browserHistory.push('/myperqs'))
    .catch(err => console.error(err))
}

// TODO
// 3/ receive a matched tweet and ensure it is part of a query
// export const checkResult = (tweet) => (dispatch) => {
//   axios.post(`/api/results`, tweet)
//     .then(result => {
//       let queryId = result.data.queryId
//       dispatch(postResult(queryId, tweet))
//     })
//     .catch(err => console.error(err))
// }

// 4/ if and when a tweets matches a query, post to the database and
// add it to the Redux store for rendering on the page

// -=-= READ =-=-
// fetch all queries
export const fetchQueries = () => (dispatch) => {
  axios.get(`/api/queries`)
    .then(queries => {
      let fetchedQueries = queries.data.sort((x,y) => {
        return y.id - x.id  // sort by most recent
      })
      dispatch(loadQueries(fetchedQueries))
    })
    .catch(err => console.error(err))
}

// -=-= DELETE =-=-
// destroy a query and all its results
export const queryDestroyer = (queryId) => (dispatch) => {
  dispatch(removeQuery(queryId))
  axios.delete(`/api/queries/${queryId}`)
  .then()
  .catch(err => console.error(err))
}

// remove a result
export const resultDestroyer = (queryId, resultId) => (dispatch) => {
  axios.delete(`/api/results/${queryId}/${resultId}`)
    .then(ok => { dispatch(removeResult(resultId)) })
    .catch(err => console.error(err))
}
