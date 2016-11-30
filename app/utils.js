import axios from 'axios'
import client from '../server/twitterAPI'

// Twitter Utility functions

export const matchedTweet = (tweet) => {
  message.text = tweet
  client.sendMessage(message)
  let result = {
    handle: tweet['user']['screen_name'],
    imgUrl: tweet['user']['profile_img_url_https'],
    text: tweet['text'],
    timestamp: tweet['created_at']
  }
  const thunk = (dispatch) => {
    dispatch(loadQueryResult(result))
  }
  return thunk
}

// HELPER FN()'s FOR ^^^^^^^^^^

const queryChecker = (query) => {
  if (query.handles.includes(',')) {
    query.handles = query.handles.split(',') // turn csv string into array
  }
  else if (!query.handles.includes(',')) {
    query.handles = query.handles.split(' ') // turn spaced string into array
  }
  if (query.terms.includes(',')) {
    query.terms = query.terms.split(',')  // ^^^^^^^^
  }
  else if (!query.terms.includes(',')) {
    query.terms = query.terms.split(' ')  // ^^^^^^^^
  }
  query.handles = query.handles.map(handle => {
    if (handle.charAt(0) === '@') return handle.slice(1) // cut off @ if exists
  })
  return query
}
