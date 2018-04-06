const { green, red, blue } = require('chalk')

const emitSuccess = message => console.log(green(` ✔ Success: ${message}`))
const emitError = message => console.log(red(` ✗ Error: ${message}`))

const initOptions = {

  /* uncommented for details connect */
  connect (client, dc, isFresh) {
    const cp = client.connectionParameters
    console.log(blue('Connected to database:', cp.database))
  },

  //  uncommented for details error
  error (err, e) {
    if (e.cn) {
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
      console.log(red(err))
    }

    if (e.query) {
      // query string is available
      console.log(red(e.query))
      if (e.params) {
        // query parameters are available
        console.log(red(e.params))
      }
    }

    if (e.ctx) {
      // occurred inside a task or transaction
    }
  },

  query (e) {
    const { text, values } = e.query
    console.log(green('QUERY EXECUTING:', text))
    console.log(green('QUERY VALUES:', values))
  }
  /* uncommeted for info over at trasactions
  transact (e) {
    if (e.ctx.finish) {
      // this is a transaction->finish event;
      console.log(green('Duration:', e.ctx.duration))
    }
    // this is a transaction->start event;
    if (!e.ctx.finish) {
      console.log(green('Start Time:', e.ctx.start))
    }
  }
  */
}

module.exports = {
  emitSuccess,
  emitError,
  initOptions
}
