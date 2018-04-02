const { PreparedStatement } = require('pg-promise')

const findColumn = (...args) =>
  new PreparedStatement('find-column', 'select table_name from information_schema.columns where column_name = $1', ...args)

module.exports = {
  findColumn
}
