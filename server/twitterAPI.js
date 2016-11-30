const Twitter = require('twitter')
const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } = require('../secrets')
const { postResult } = require('../app/reducers')

// TWITTER CONFIG

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET
})

/* TWEET RESPONSE JSON (what we're taking from it)
{
  "created_at": STRING/TIMESTAMP,
  "user": {
    "profile_img_url_https": STRING/URL,
    "screen_name": STRING/NO-@-HANDLE
  },
  "text": STRING/TEXT
}
*/

/* TWEET REQUEST JSON (POST) (what we're giving)
{
  "follow": "handle1,handle2,handle3"
}
*/

// streaming API access method => client.stream
// client.stream('twitter_api/endpoint', { follow/location/track: 'comma,delimited,input,here' }, callback)

let FILTER_TABLE = {}

const addToFilter = (queryId, ids, terms) => {
  FILTER_TABLE.queryId = {
    ids,
    terms
  }
  return FILTER_TABLE
}

const getIds = (handles) => {
  client.post('users/lookup', { screen_name: handles }, (error, tweets, response) => {
    if (error) throw error
    let ids = tweets.map(tweet => {
      if (tweet.id) return tweet.id
    })
    return ids.join(',')
  })
}

const streamFilter = (ids, terms) => dispatch => {
  client.stream('statuses/filter', { follow: ids }, (stream) => {
    stream.on('data', (tweet) => {               // receive back any tweets matching our provided handles
      if (terms.some(term => {                   // see if those tweets contain our terms
        return tweet.text.indexOf(term) >= 0
      })) {
        dispatch(postResult(tweet))              // if yes, dispatch tweet
      }
    })
    stream.on('error', (error) => {              // else, throw error
      throw error
    })
  })
}

module.exports = { client, getIds, streamFilter }
