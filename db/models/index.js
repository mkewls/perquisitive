'use strict'

// models
const Query = require('./query')
const Result = require('./result')

// associations
Query.hasMany(Result)  // result << queryId // Query.getResults()/setResults()

module.exports = { Query, Result }
