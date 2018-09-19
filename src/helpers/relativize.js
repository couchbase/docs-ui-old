'use strict'

const { posix: path } = require('path')

module.exports = (to, { data: { root } }) => {
  if (!to) return '#'
  const from = root.page.url
  if (!from || to.charAt() === '#') return to
  let hash = ''
  const hashIdx = to.indexOf('#')
  if (~hashIdx) {
    hash = to.substr(hashIdx)
    to = to.substr(0, hashIdx)
  }
  return to === from
    ? hash || (isDir(to) ? './' : path.basename(to))
    : (path.relative(path.dirname(from + '_'), to) || '.') + (isDir(to) ? '/' + hash : hash)
}

function isDir (str) {
  return str.charAt(str.length - 1) === '/'
}
