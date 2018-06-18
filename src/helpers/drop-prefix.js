'use strict'

module.exports = (str, prefix) => str && str.startsWith(prefix) ? str.slice(prefix.length) : str
