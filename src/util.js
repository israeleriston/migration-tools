const { green, red } = require('chalk')

/**
 * Message of emiting if success
 * @param {string} message
 */
const emitSuccess = message => console.log(green(` ✔ Success: ${message}`))

/**
 * Message of emiting if error
 * @param {string} message
 */
const emitError = message => console.log(red(` ✗ Error: ${message}`))

module.exports = {
  emitSuccess,
  emitError
}
