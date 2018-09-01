;(function () {
  var docsearch = require('docsearch.js/dist/cdn/docsearch.js')
  var config = document.getElementById('search-script').dataset
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = config.stylesheet
  document.head.appendChild(link)
  docsearch({
    appId: config.appId,
    apiKey: config.apiKey,
    indexName: config.indexName,
    inputSelector: '#search-query',
    algoliaOptions: { hitsPerPage: 25 },
    debug: false,
  })
})()
