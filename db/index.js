'use strict'

const debug = require('debug')('sql')  // to see SQL queries from Sequelize
const chalk = require('chalk')
const Sequelize = require('sequelize')  // so upper case, so important

// db server constant(s)
const URL = process.env.DATABASE_URL || 'postgres://localhost:5432/perquisitive'

// notify the user we're about to do it
console.log(chalk.yellow(`Opening database connection to ${URL}`))

// do it
const db = new Sequelize(URL, {
  logging: debug,      // per require at top
  native: true,        // use pg-native
  define: {
    freezeTableName: true,  // don't go changing our table names, Sequelize
  }
})

// pull in models to database
require('./models')
// sync them
db.sync({force: true}).then(ok => console.log(chalk.yellow('Database synced'))).catch()

module.exports = db
