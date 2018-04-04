#!/usr/bin/env node

require('require-sql')
const { PreparedStatement } = require('pg-promise')
// const { template } = require('lodash/fp')

const columnQuery = require('./resource/column.sql')
const foreingQuery = require('./resource/foreing.sql')
const primaryQuery = require('./resource/primary.sql')

// const toQuery = (query, args) => {
//   const compile = template(query)
//   const apply = compile(args)
//   console.log(' apply ', apply)
//   return apply
// }

const findColumn = (...args) =>
  new PreparedStatement('FindColumn', columnQuery, args)

const createForeing = (...args) =>
  new PreparedStatement('CreateForeing', foreingQuery, args)

const createPrimary = (...args) =>
  new PreparedStatement('CreatePrimary', primaryQuery, args)

module.exports = {
  findColumn,
  createForeing,
  createPrimary
}
