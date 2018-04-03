
const {
  findColumn,
  createFK,
  createPK
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
const connect = url => database(url)

/**
 * connect for database
 */
const pg = db => connect(db)

const action = ({ table, pk, db }) => {
  const parameters = findColumn(pk)
  pg(db)
    .any(parameters)
    .then(data => data)
}

/**
 * to converter parameters for query
 * @param {Array<String>} args
 */
const toParameter = (...args) => {
  const toParam = createFK(args)
  return toParam
}
/**
 * array of tables to sanitization
 * @param {String} tables
 */
const sanitize = ({ tables, pk, table, db }) => {
  const parameters = tables.map(value => toParameter(value, table, pk))
  parameters.map(value => {
    pg(db).any(value)
      .then(data => console.log('sanitize with successefully! ', data))
  })
}

const normalize = ({ table, pk, db }) => {
  const parameters = createPK(table, pk)
  pg(db)
    .any(parameters)
    .then(data => console.log('normalize ', data))
}

/**
 * array of parameters
 * @param {Array} args
 */
const migration = (args) => {
  action(args)
    .then(data => data)
    .then(postData => normalize(...args))
    .then(tables => sanitize({ ...tables, ...args }))
    .catch(err => emitError(err.message))
}

module.exports = migration
