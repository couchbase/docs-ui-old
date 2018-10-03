'use strict'

const SEARCH_RX = /^.*(?=\/home\/)/

module.exports = (editUrl, baseUrl, branch) =>
  editUrl.replace(SEARCH_RX, `${baseUrl}/edit/${branch === 'HEAD' ? 'master' : branch}`)
