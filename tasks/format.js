'use strict'

const run = require('./lib/run-command')

module.exports = (files) => {
  return run('prettier-eslint', ['--write', ...files])
}
