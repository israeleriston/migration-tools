require('require-sql')
const { PreparedStatement } = require('pg-promise')

const findColumnQuery = require('./resource/findColumn.sql')
const createFKQuery = require('./resource/createFK.sql')
const createPKQuery = require('./resource/createPK.sql')

const findColumn = (...args) =>
  new PreparedStatement('find-column', findColumnQuery, ...args)

const createFK = (...args) =>
  new PreparedStatement('create-fk', createFKQuery, ...args)

const createPK = (...args) =>
  new PreparedStatement('create-pk', createPKQuery, ...args)

module.exports = {
  findColumn,
  createFK,
  createPK
}
