#!/usr/bin/env node

require('require-sql')
const { PreparedStatement } = require('pg-promise')

const columnQuery = require('./resource/column.sql')
const foreingQuery = require('./resource/foreing.sql')
const primaryQuery = require('./resource/primary.sql')
const checkPrimaryQuery = require('./resource/check.sql')

const findColumn = (...args) =>
  new PreparedStatement('FindColumn', columnQuery, args)

const createForeing = (...args) =>
  new PreparedStatement('CreateForeing', foreingQuery, args)

const createPrimary = (...args) =>
  new PreparedStatement('CreatePrimary', primaryQuery, args)

const checkPrimary = (...args) =>
  new PreparedStatement('CheckPrimary', checkPrimaryQuery, args)

module.exports = {
  findColumn,
  createForeing,
  createPrimary,
  checkPrimary
}
