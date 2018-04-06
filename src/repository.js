const query = require('./query')
const { template } = require('lodash/fp')

function transform (text, values) {
  const compile = template(text)
  return compile(values)
}

/**
 * path of connection with database
 * @param {String} url
 * @return {Object} object with operations of migrations
 */
const repository = () => ({
  search: (column) => transform(query.search, { column }),
  searchInternals: (table) => transform(query.searchInternals, { table }),
  createInternals: (table, pk) => transform(query.createInternals, { table, pk }),
  createExternals: (current, pk, table) => transform(query.createExternals, { current, pk, table })
})

module.exports = repository
