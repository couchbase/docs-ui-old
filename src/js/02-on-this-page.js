;(function () {
  'use strict'

  var doc = document.querySelector('article.doc')
  if (!doc) return
  var menu = document.querySelector('aside.toc.sidebar .toc-menu')
  var headings = find('.sect1 > h2[id]', doc)
  if (!headings.length) {
    if (menu) menu.parentNode.removeChild(menu)
    return
  }
  var hasSidebar
  var lastActiveFragment
  var links = {}

  var list = headings.reduce(function (accum, heading) {
    var link = toArray(heading.childNodes).reduce(function (target, child) {
      if (child.nodeName !== 'A') target.appendChild(child.cloneNode(true))
      return target
    }, document.createElement('a'))
    links[link.href = '#' + heading.id] = link
    var listItem = document.createElement('li')
    listItem.appendChild(link)
    accum.appendChild(listItem)
    return accum
  }, document.createElement('ol'))

  if (!(hasSidebar = !!menu)) {
    menu = document.createElement('div')
    menu.className = 'toc-menu'
  }

  var title = document.createElement('h3')
  title.textContent = 'On This Page'
  menu.appendChild(title)
  menu.appendChild(list)

  if (hasSidebar) window.addEventListener('scroll', onScroll)

  var startOfContent = doc.querySelector('h1.page + *')
  if (startOfContent) {
    var embeddedToc = document.createElement('aside')
    embeddedToc.className = 'toc embedded'
    embeddedToc.appendChild(hasSidebar ? menu.cloneNode(true) : menu)
    doc.insertBefore(embeddedToc, startOfContent)
  }

  function onScroll () {
    //var targetPosition = doc.parentNode.getBoundingClientRect().top + window.pageYOffset
    var targetPosition = doc.parentNode.offsetTop
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
  }

  function find (selector, from) {
    return toArray((from || document).querySelectorAll(selector))
  }

  function toArray (collection) {
    return [].slice.call(collection)
  }
})()
