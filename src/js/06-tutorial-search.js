;(function () {
  'use strict'

  /* All tutorials */
  var tiles = document.querySelectorAll('.doc .sect1')

  /* Search every time the input text is modified */
  document.getElementById('search-tutorials').addEventListener('input', function () {
    var doc = document.getElementsByClassName('doc')[0]
    var name = document.getElementById('search-tutorials').value
    var pattern = name.toLowerCase()

    /* if the search term is empty, return all tutorials */
    if (pattern === '') {
      doc.innerHTML = ''
      for (var i = 0; i < tiles.length; i++) {
        doc.appendChild(tiles[i])
      }
      return
    }

    /* find tiles that contain `pattern` in the h2 heading */
    var resultDivs = []
    for (var j = 0; j < tiles.length; j++) {
      var para = tiles[j].getElementsByTagName('h2')
      var index = para[0].innerText.toLowerCase().indexOf(pattern)
      if (index !== -1) {
        resultDivs.push(tiles[j])
      }
    }

    /* update list of tiles */
    doc.innerHTML = ''
    for (var k = 0; k < resultDivs.length; k++) {
      doc.appendChild(resultDivs[k])
    }
  })
})()
