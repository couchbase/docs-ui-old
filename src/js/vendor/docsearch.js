;(function () {
  var docsearch = require('docsearch.js/dist/cdn/docsearch.js')
  var config = document.getElementById('search-script').dataset
  var style = document.createElement('style')
  style.innerText = '@import "' + config.stylesheet + '"'
  document.body.appendChild(style)
  docsearch({
    appId: config.appId,
    apiKey: config.apiKey,
    indexName: config.indexName,
    inputSelector: '#search-query',
    algoliaOptions: { hitsPerPage: 25 },
    debug: false,
  })
})()
