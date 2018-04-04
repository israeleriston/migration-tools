#!/usr/bin/env node

const {
  findColumn,
  createForeing,
  createPrimary
} = require('./query')

const {
  initOptions,
  emitError
} = require('./util')

const database = require('pg-promise')(initOptions)

/**
 * path of url database for connection
 * @param {String} url
 */
const pg = url => database(url)

const action = ({ table, pk, db }) => {
  const query = findColumn(pk)
  return pg(db)
    .any(query)
    .then(data => {
      console.log('data findColumn ', data)
      return data
    })
}

/**
 * to converter parameters for query
 * @param {Array<String>} args
 */
const toParameter = (...args) => {
  const toParam = createForeing(args)
  return toParam
}
/**
 * array of tables to sanitization
 * @param {String} tables
 */
const sanitize = ({ tables, pk, table, db }) => {
  const querys = tables.map(value => toParameter(value, table, pk))
  querys.map(query => {
    pg(db).any(query)
      .then(data => console.log('sanitize with successefully! ', data))
  })
}

const normalize = ({ table, pk, db }) => {
  const query = createPrimary(table, pk)
  return pg(db)
    .any(query)
    .then(data => {
      console.log('normalize ', data)
      return data
    })
}

/**
 * array of parameters
 * @param {Array} args
 */
const migration = (args) => {
  return action(args)
    .then(postData => normalize(...args))
    .then(tables => sanitize({ ...tables, ...args }))
    .catch(err => emitError(err.message))
}

module.exports = migration
