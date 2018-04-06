#!/usr/bin/env node

const query = require('./query')
const { template } = require('lodash/fp')

/**
 * Function util that transform queries and parameters
 * into queries tranlating your parameters using template.
 * using lib lodash/template
 *
 * IMPORTANT: don't changing it's function,
 * exclusive, if your can changing don't breaking
 * change into application
 *
 * @see lodash
 * @param {string} text
 * @param {string} values
 */
function _transform (text, values) {
  const compile = template(text)
  return compile(values)
}

/**
 * path of connection with database
 * @param {String} url
 * @return {Object} object with operations of migrations
 */
const repository = () => ({
  /**
   * query for searching all tables with it's column that used with parameter
   */
  search: (column) => _transform(query.search, { column }),
  /**
   * query for searching if it's table know primary key
   */
  searchInternals: (table) => _transform(query.searchInternals, { table }),
  /**
   * query for creating primary key using table and pk that parameters
   */
  createInternals: (table, pk) => _transform(query.createInternals, { table, pk }),
  /**
   * query for creating foreing key using current<table foreing>, primary key and table
   */
  createExternals: (current, pk, table) => _transform(query.createExternals, { current, pk, table })
})

module.exports = repository
