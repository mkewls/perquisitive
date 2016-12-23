import axios from 'axios'
import { browserHistory } from 'react-router'
// reducers
import { addQuery, loadQueries, removeQuery } from './queries'
import { addResult, removeResult } from './results'
// twitter config
import Twitter from 'twitter'
import { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } from '../../secrets'

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
})

const FILTER_TABLE = {} // hash table storage

// START HERE ==> 1/ query received from user and formatted
export const formatQuery = (query) => (dispatch) => {
  let handles = query.handles.split(/[\s,]+/)  // make array
  handles = handles.map(handle => {
    if (handle.charAt(0) === '@') return handle.slice(1).toLowerCase()  // slice off '@'
    return handle.toLowerCase()
  })
  // return to string format with commas for twitter api
  handles = handles.join(',')
  // format query terms too
  let terms = query.terms.toLowerCase().split(/[\s,]+/)

  query.handles = handles
  query.terms = terms

  dispatch(getIds(query))  // query twitter api via getIds()
}

// 2/ formatted query handles are passed to an id look-up;
// user ids, not handles, are needed to filter streaming data
export const getIds = (query) => (dispatch) => {
  let ids = []
  // look-up twitter ids using handles
  client.get('users/lookup', { screen_name: query.handles }, (error, tweets, response) => {
    if (error) throw error
    ids = tweets.map(tweet => {
      if (tweet.id) return tweet.id
    }).join(',')
    dispatch(addIdsToQuery(query, ids))
  })
}

// 3/ Put the Ids into a query to add to db
export const addIdsToQuery = (query, ids) => (dispatch)=> {
  let newQuery = {
    title: query.title,
    handles: query.handles,
    userIds: ids,
    terms: query.terms,
    phone: query.phone
  }
  dispatch(postQuery(newQuery))
}

// 4/ query is added to the database, then dispatched to
// the TwitterAPI and to the Redux Store for rendering on the page
export const postQuery = (newQuery) => (dispatch) => {
  axios.post('/api/queries', newQuery)
    .then(query => {
      let storedQuery = {
          id: query.data.id,
          title: query.data.title,
          handles: query.data.handles,
          userIds: query.data.userIds,
          terms: query.data.terms,
          phone: query.data.phone
        }
      dispatch(streamFilter(storedQuery))
    })
    .then(() => browserHistory.push('/myperqs'))
    .catch(err => console.error(err))
}

// 5/ add query ids and terms to the twitter streaming filter
export const streamFilter = (query) => dispatch => {
  let queryId = query.id, ids = query.userIds, terms = query.terms

  FILTER_TABLE[`${queryId}`] = {
    ids,   // string
    terms  // array
  }

  let filterIds = '', filterTerms = [], keys = Object.keys(FILTER_TABLE)
  for (let key of keys) {
    filterIds += FILTER_TABLE[key]['ids'],
    filterTerms = filterTerms.concat(FILTER_TABLE[key]['terms'])
  }

  client.stream('statuses/filter', { follow: filterIds }, (stream) => {
    console.log('Filtering Twitter stream...')
    stream.on('data', (tweet) => {               // receive back any id-matched tweets
      let check = filterTerms.some(term => tweet.text.indexOf(term) >= 0)  // check for term
      if (check)
        dispatch(matchedTweet(tweet))            // if yes, dispatch tweet
    })
    stream.on('error', (error) => {              // error catching
      throw error
    })
  })
}

// 6/ receive a matched tweet and ensure it is part of a query
export const matchedTweet = (tweet) => (dispatch) => {
  let keys = Object.keys(FILTER_TABLE), queryIds = []

  for (let key of keys) {
    let termsArr = FILTER_TABLE[key]['terms']
    if (FILTER_TABLE[key]['ids'].includes(tweet.user.id) &&
      termsArr.some(term => tweet.text.indexOf(term >= 0))) {
        queryIds.push(key)
      }
  }
  while (queryIds.length > 0) {
    let result = {
      handle: tweet.user.screen_name,
      imgUrl: tweet.user.profile_image_url_https,
      tweetId: tweet.id_str,
      text: tweet.text,
      timestamp: tweet.created_at,
      queryId: queryIds.pop()
    }
    dispatch(postResult(result))
  }
}

// 7/ if and when a tweets matches a query, post to the database and
// add it to the Redux store for rendering on the page
export const postResult = (tweet) => (dispatch) => {
  axios.post(`/api/queries/${tweet.queryId}/results`, tweet)
    .then(result => {
      dispatch(addResult(result.data))
    })
    .catch(err => console.error(err))
}
