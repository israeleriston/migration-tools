#!/usr/bin/env node
const { green, red } = require('chalk')
const figlet = require('figlet')
const migration = require('./migration')
const yargs = require('yargs')

const emitSuccess = message => console.log(green(` ✔ Success: ${message}`));
const emitError = message => console.log(red(` ✗ Error: ${message}`));


function init () {
  console.log(
    green(
      figlet.textSync('Migration Tool', { horizontalLayout: 'full' })
    )
  )
}

function cli(args) {
  init()
  migration(args)
  // .then(() => emitSuccess('Migration Finally. '))
  // .catch(() => emitError('Migration Failed. '))
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
