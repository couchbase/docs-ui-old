;(function () {
  var docsearch = require('docsearch.js/dist/cdn/docsearch.js')
  window.setTimeout(function () {
    var config = document.getElementById('search-script').dataset
    var style = document.createElement('style')
    style.innerText = '@import "' + config.stylesheet + '"'
    document.head.appendChild(style)
    var docsearchInstance = docsearch({
      appId: config.appId,
      apiKey: config.apiKey,
      indexName: config.indexName,
      inputSelector: '#search-query',
      algoliaOptions: { hitsPerPage: 25 },
      debug: false,
    })
    document.querySelector('button.search').addEventListener('click', function (e) {
      if (document.querySelector('.navbar-start').classList.toggle('reveal-search-input')) {
        docsearchInstance.autocomplete.autocomplete.setVal('')
        docsearchInstance.input.focus()
      }
    })
  }, 1000)
})()
