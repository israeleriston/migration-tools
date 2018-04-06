const { green, red } = require('chalk')

const emitSuccess = message => console.log(green(` ✔ Success: ${message}`))
const emitError = message => console.log(red(` ✗ Error: ${message}`))

module.exports = {
  emitSuccess,
  emitError
}
