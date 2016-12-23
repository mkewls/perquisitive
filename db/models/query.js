'use strict'

const Sequelize = require('sequelize')
const db = require('../../db')

const Query = db.define('query', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  handles: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  userIds: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  terms: Sequelize.ARRAY(Sequelize.STRING),
  phone: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Query
