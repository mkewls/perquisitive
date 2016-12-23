'use strict'

// router
const express = require('express')
const api = express()
// db model
const { Query, Result } = require('../db/models')

// -=-=-= CREATE =-=-=-

// add a query
api.post('/queries', (req, res, next) => {
  Query.create({
      title: req.body.title,
      handles: req.body.handles,
      userIds: req.body.userIds,
      terms: req.body.terms,
      phone: req.body.phone
    })
    .then(query => {
      res.status(201).json(query)   // created
    })
    .catch(next)
})

// add a result for a particular user's query
api.post('/queries/:queryId/results', (req, res, next) => {
  Result.create({
      handle: req.body.handle,
      imgUrl: req.body.imgUrl,
      text: req.body.text,
      timestamp: req.body.timestamp,
      queryId: req.params.queryId
    })
    .then(result => {
      res.status(201).json(result)   // created
    })
    .catch()
})

// -=-=-=-= READ =-=-=-=-

// get all queries and results
api.get('/queries', (req, res, next) => {
  Query.findAll({
      include: [ Result ]
    })
    .then(queries => {
      res.status(200).json(queries)
    })
    .catch(next)
})

// -=-=-=-=-= DELETE =-=-=-=-=-

// delete a query and its results
api.delete('/queries/:queryId', (req, res, next) => {
  Query.destroy({
      where: {
        id: req.params.queryId
      },
      include: [ Result ]
    })
    .then(ok => res.status(204))  // no content
    .catch(next)
})

// delete a single result
api.delete('/queries/:queryId/results/:resultId', (req, res, next) => {
  Result.destroy({
      where: {
        id: req.params.resultId
      },
    })
    .then(ok => res.status(204))  // no content
    .catch(next)
})

module.exports = api
