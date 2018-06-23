'use strict'

module.exports = (str, prefix) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)
