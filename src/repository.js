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
  search: (column) => _transform(query.search, { column }),
  searchInternals: (table) => _transform(query.searchInternals, { table }),
  createInternals: (table, pk) => _transform(query.createInternals, { table, pk }),
  createExternals: (current, pk, table) => _transform(query.createExternals, { current, pk, table })
})

module.exports = repository
