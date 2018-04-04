#!/usr/bin/env node

const {
  findColumn,
  createForeing,
  createPrimary,
  checkPrimary
} = require('./query')

const {
  initOptions
} = require('./util')

const database = require('pg-promise')(initOptions)

const { isEmpty } = require('lodash/fp')

/**
 * path of url database for connection
 * @param {String} url
 */
const pg = url => database(url)

const getTables = (args) => {
  const { pk, conn } = args
  const query = findColumn(pk)
  return conn
    .query(query)
    .then(tables => createRelation({ tables, args }))
}

/**
 * to converter parameters for query
 * @param {Array<String>} args
 */
const toParameter = (...args) => createForeing(args)

/**
 * array of tables to sanitization
 * @param {String} tables
 */
const createRelation = (args) => {
  const { tables, pk, table, conn } = args
  const querys = tables.map(value => toParameter(value, table, pk))
  querys.map(param => {
    return conn.query(param)
      .then(data => console.log('sanitize with successefully! ', data))
  })
}
const create = (args) => {
  const { table, pk, conn } = args
  const query = createPrimary(table, pk)
  return conn
    .query(query)
    .then(data => data)
}

const action = (args) => {
  const { table, conn } = args
  const query = checkPrimary(table)
  return conn
    .query(query)
    .then(data => isEmpty(data) ? create(args) : data)
    .then(() => getTables(args))
}

//   .then(postData => normalize(...args))
// .then(tables => sanitize({ ...tables, ...args }))

/**
 * url to connect with database
 * returing object of connecting with database
 * @param {String} db
 * @returns {conn}
 */
const connect = ({ db }) => pg(db)

/**
 * array of parameters
 * @param {Array} args
 */
const migration = (args) => {
  const conn = connect(args)

  const defaults = { ...args, conn }

  return action(defaults)
    .catch(err => {
      return Promise.reject(err)
    })
}

module.exports = migration
