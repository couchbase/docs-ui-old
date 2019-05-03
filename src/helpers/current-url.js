'use strict'

module.exports = (url) => url.replace(/^(\/[^/]+)\/[^/]+(?=\/)/, '$1/current')
