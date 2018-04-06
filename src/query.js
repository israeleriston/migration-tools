#!/usr/bin/env node

require('require-sql')
const path = require('path')

/**
 * url the file from converting file to fullpath
 * @param {String} file
 */
function sql (file) {
  const fullPath = path.join(__dirname, file) /** generating full path  */
  return require(fullPath)
}

module.exports = {
  search: sql('resource/column.sql'),
  searchInternals: sql('resource/check.sql'),
  createInternals: sql('resource/primary.sql'),
  createExternals: sql('resource/foreing.sql')
}
