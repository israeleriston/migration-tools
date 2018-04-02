const { initOptions } = require('./util')
const { red } = require('chalk')
const Database = require('pg-promise')(initOptions)

const { findColumn } = require('./query')

const connect = url => Database(url)

const migration = (args) => {
  const { db, table, pk } = args

  const connector = connect(db)
  const query = findColumn(pk)

  connector.any(query)
    .then(data => {
      console.log('data .: ', data)
    })
    .catch(() => {
      // console.error(red(err.message))
    })
}

module.exports = migration
