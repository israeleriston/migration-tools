#!/usr/bin/env node

const figlet = require('figlet')

const yargs = require('yargs')

const { green } = require('chalk')

const migration = require('./migration')

const { emitError, emitSuccess } = require('./util')

const { pipe, prop } = require('ramda')

function init () {
  console.log(
    green(
      figlet.textSync('Migration Tool', { horizontalLayout: 'full' })
    )
  )
}

function cli (args) {
  init()
  migration(args)
    .then(() => {
      emitSuccess('Regeneration PKs and FKs with success!')
      process.exit(1)
    })
    .catch(pipe(prop('message'), emitError))
}

cli(yargs
  .usage('Use: migration --db=<db>  --table=<table> --pk=<pk>')
  .option('db', {
    describe: 'Database for connecting',
    type: 'string'
  })
  .option('table', {
    describe: 'Table for recreate primary keys',
    type: 'string'
  })
  .option('pk', {
    describe: 'Primary Key for base of search ',
    type: 'string'
  })
  .demandOption(['db', 'table', 'pk'])
  .strict()
  .help()
  .version()
  .argv)
