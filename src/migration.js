#!/usr/bin/env node

const { isEmpty } = require('lodash/fp')

const repository = require('./repository')

const database = require('./db')

/**
 * arguments of options
 * @param {String} args
 */
const getTables = (args) => {
  const { pk, service, db } = args
  const query = service.search(pk)
  return db.query(query)
    .then(tables => createRelation(tables, args))
}

/**
 * Params for composer query of creating relation
 *
 * @param {string} db
 * instance of client postgres
 *
 * @param {Object} service
 * object with querys
 *
 * @param {string} value
 *
 *
 * @param {string} table
 * table using with parameter
 *
 * @param {string} pk
 * params for primary key
 */
function converterToQuery (db, service, value, table, pk) {
  const query = service.createExternals(value, table, pk)
  return db.query(query)
}

/**
 * normalized tables
 * @param {string} tables
 * @param {string} table
 */
function normalizeTables (tables, table) {
  const values = tables.rows
    .reduce((acc, cur) => {
      const name = cur.table_name
      if (name !== table) {
        acc.push(name)
      }
      return acc
    }, [])
  return values
}

/**
 * array of tables to sanitization
 * @param {string} tables
 */
const createRelation = (tables, args) => {
  const { pk, table, service, db } = args
  if (isEmpty(tables.rows)) {
    return Promise.reject(new Error(`Not found tables with pk ${pk}`))
  }
  const values = normalizeTables(tables, table)

  const promises = values.map(value => converterToQuery(db, service, value, table, pk))

  return Promise
    .all(promises)
    .then(success => success)
}

/**
 *
 * @param {Object} data
 * @param {*} args
 */
const create = (data, args) => {
  const { table, pk, service, db } = args

  if (!isEmpty(data.rows)) {
    return Promise.resolve(data)
  }

  const query = service.createInternals(table, pk)

  return db
    .query(query)
    .then(data => data)
}

/**
 * arguments of options
 * @param {String} args
 */
const action = (args) => {
  const { table, service, db } = args

  const query = service.searchInternals(table)

  return db.query(query)
    .then(data => create(data, args))
    .then(() => getTables(args))
}

/**
 * arguments inside from cli
 * @param {Array} args
 */
const migration = (args) => {
  /**
   * generating client of database
   */
  const db = database(args.db)

  /**
   * call method for estabelished connecting with database
   */
  db.connect()
    .then(client => {
      console.log('Database Connected')
    })

  /**
   * injecting service partials repository
   */
  const service = repository(db)

  /**
   * defauts params to all actions
   **/
  const defaults = { ...args, service, db }

  /**
   * despacth actions for initials options
   */
  return action(defaults)
    .catch(err => {
      /**
       * rejecting promise if maybe actions for rejected
       */
      return Promise.reject(err)
    })
}

module.exports = migration
