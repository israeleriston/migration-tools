#!/usr/bin/env node

const path = require('path')
const { QueryFile } = require('pg-promise')

function sql (file) {
  const fullPath = path.join(__dirname, file) /** generating full path  */
  console.log('SQL => ', fullPath)
  return new QueryFile(fullPath, { minify: true })
}

module.exports = {
  search: sql('resource/column.sql'),
  searchInternals: sql('resource/check.sql'),
  createInternals: sql('resource/primary.sql'),
  createExternals: sql('resource/foreing.sql')
}
