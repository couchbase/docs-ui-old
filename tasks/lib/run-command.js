'use strict'

const PluginError = require('plugin-error')
const { promisify } = require('util')
const { spawn } = require('child_process')
const which = require('npm-which')(__dirname)

module.exports = (name, args, onSuccess) =>
  promisify(which)(name).then((command) =>
    new Promise((resolve, reject) => {
      spawn(command, args, { stdio: 'inherit' }).on('close', (code) => {
        if (code === 0) {
          if (onSuccess) onSuccess()
          return resolve()
        }
        return reject(new PluginError('run-command', `${name} command failed`))
      })
    }))
