const { initOptions } = require('./util')

const database = require('pg-promise')(initOptions)

/**
 * url to connect with database
 * returing object of connecting with database
 * @param {String} url
 * @returns {conn}
 */
const connect = (url) => database(url)

module.exports = connect
