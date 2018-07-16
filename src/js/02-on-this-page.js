;(function () {
  'use strict'

  var doc = document.querySelector('.doc')
  var headings = find('h2[id]', doc)
  if (headings.length === 0) return
  var links = {}

  var list = document.createElement('ol')
  headings.forEach(function (heading) {
    var listItem = document.createElement('li')
    var link = document.createElement('a')
    links[link.href = '#' + heading.id] = link
    link.innerHTML = heading.innerHTML
    listItem.appendChild(link)
    list.appendChild(listItem)
  })
  var menu = document.createElement('div')
  menu.className = 'toc-menu'
  var title = document.createElement('h3')
  title.innerHTML = 'On This Page'
  menu.appendChild(title)
  menu.appendChild(list)
  document.querySelector('aside.toc').appendChild(menu)

  var startOfContent = doc.querySelector('h1 + *')
  if (startOfContent) {
    var tocEmbedded = document.createElement('aside')
    tocEmbedded.className = 'toc embedded'
    tocEmbedded.appendChild(menu.cloneNode(true))
    doc.insertBefore(tocEmbedded, startOfContent)
  }

  var lastActiveFragment
  window.addEventListener('scroll', function () {
    var targetPosition = menu.getBoundingClientRect().top
    var activeFragment
    headings.some(function (heading) {
      if (heading.getBoundingClientRect().top < targetPosition) {
        activeFragment = '#' + heading.id
      } else {
        return true
      }
    })
    if (activeFragment) {
      if (activeFragment !== lastActiveFragment) {
        if (lastActiveFragment) {
          links[lastActiveFragment].classList.remove('is-active')
        }
        links[activeFragment].classList.add('is-active')
        lastActiveFragment = activeFragment
      }
    } else if (lastActiveFragment) {
      links[lastActiveFragment].classList.remove('is-active')
      lastActiveFragment = undefined
    }
  })

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }
})()
