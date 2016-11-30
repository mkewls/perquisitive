'use strict'

const Sequelize = require('sequelize')
const db = require('../../db')

const Result = db.define('result', {
  handle: {
    type: Sequelize.STRING,
    notNull: true
  },
  imgUrl: Sequelize.STRING,
  text: Sequelize.TEXT,
  timestamp: Sequelize.STRING
})

module.exports = Result
