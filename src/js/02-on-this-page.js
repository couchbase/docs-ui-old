;(function () {
  'use strict'

  var headings = find('.doc h2[id]', document)

  if (headings.length) {
    var list = document.createElement('ol')
    headings.forEach(function (heading) {
      var listItem = document.createElement('li')
      var link = document.createElement('a')
      link.href = '#' + heading.id
      link.innerHTML = heading.innerHTML
      listItem.appendChild(link)
      list.appendChild(listItem)
    })
    var toc = document.createElement('div')
    toc.className = 'toc'
    var title = document.createElement('h3')
    title.innerHTML = 'On This Page'
    toc.appendChild(title)
    toc.appendChild(list)
    var utilities = document.querySelector('.utilities')
    utilities.appendChild(toc)
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }
})()
