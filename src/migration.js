const { initOptions, emitError, emitSuccess } = require('./util')

const { findColumn, createFK } = require('./query')

const Database = require('pg-promise')(initOptions)

const connect = url => Database(url)

const migration = (args) => {
  const { db, pk, table } = args

  const pg = connect(db)
  const query = findColumn(pk)

  pg.query(query)
    .then(data => ({ data }))
    .then(tables => {
      tables.data.map(value => {
        pg.query(createFK(value, table, pk))
          .then(data => {
            console.log('deu certo! ' + data)
          }).catch(err => console.log('deu errado ', err))
      })
    })
    .catch(err =>
      emitError(err.message)
    )
}

module.exports = migration
