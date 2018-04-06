const query = require('./query')
const db = require('./db')

/**
 * path of connection with database
 * @param {String} url
 * @return {Object} object with operations of migrations
 */
const repository = (url) => ({
  search: (column, cn) => db(url).map(query.search, [ column ], cn),
  searchInternals: (table) => db(url).any(query.searchInternals, [ table ]),
  createInternals: (table, pk) => db(url).any(query.createInternals, [ table, pk ]),
  createExternals: (current, pk, table) => db(url).any(query.createExternals, [ current, pk, table ])
})

module.exports = repository
