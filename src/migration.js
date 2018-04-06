#!/usr/bin/env node

const { isEmpty } = require('lodash/fp')

const repository = require('./repository')

/**
 * arguments of options
 * @param {String} args
 */
const getTables = (args) => {
  const { pk, db } = args
  return repository(db)
    .search(pk, row => row.table_name)
    .then(tables => createRelation(tables, args))
}

/**
 * array of tables to sanitization
 * @param {String} tables
 */
const createRelation = (tables, args) => {
  const { pk, table, db } = args
  if (isEmpty(tables)) {
    return Promise.reject(new Error(`Not found tables with pk ${pk}`))
  }

  const promises = tables.map(value => repository(db).createExternals(value, table, pk))

  return Promise.all(promises)
    .then(values => values)
}

/**
 *
 * @param {Object} data
 * @param {*} args
 */
const create = (data, args) => {
  const { table, pk, db } = args
  if (isEmpty(data)) {
    return Promise.resolve(data)
  }

  return repository(db)
    .createInternals(table, pk)
    .then(data => data)
}

/**
 * arguments of options
 * @param {String} args
 */
const action = (args) => {
  const { table, db } = args
  return repository(db)
    .searchInternals(table)
    .then(data => create(data, args))
    .then(() => getTables(args))
}

/**
 * array of parameters
 * @param {Array} args
 */
const migration = (defaults) => {
  return action(defaults)
    .catch(err => {
      return Promise.reject(err)
    })
}

module.exports = migration
