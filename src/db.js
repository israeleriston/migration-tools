const { Client } = require('pg')

/**
 * url to connect with database
 * returing instance of client postgreSQL
 * @param {String} url
 * @returns {db}
 */
const db = (url) =>
  new Client({ connectionString: url })

module.exports = db
