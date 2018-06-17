;(function () {
  'use strict'

  var navContainer = document.querySelector('.navigation-container')
  var menuPanel = navContainer.querySelector('[data-panel=menu]')
  if (!menuPanel) return

  var navState = getNavState()
  var menuState = getMenuState(navState, navContainer.dataset.component, navContainer.dataset.version)

  find('.nav-toggle', menuPanel).forEach(function (btn) {
    var li = btn.parentElement.parentElement
    btn.addEventListener('click', function () {
      li.classList.toggle('is-active')
      menuState.expandedItems = getExpandedItems()
      saveNavState()
    })
  })

  find('.nav-item', menuPanel).forEach(function (item, idx) {
    item.setAttribute('data-id', 'menu-' + item.dataset.depth + '-' + idx)
  })

  var expandedItems = menuState.expandedItems || (menuState.expandedItems = [])

  var currentPageItem = menuPanel.querySelector('.is-current-page')
  if (currentPageItem) {
    activateCurrentPath(currentPageItem).forEach(function (itemId) {
      if (expandedItems.indexOf(itemId) < 0) expandedItems.push(itemId)
    })
  }

  saveNavState()

  function activateCurrentPath (navItem) {
    var ids = [navItem.dataset.id]
    var ancestorClasses
    var ancestor = navItem.parentNode
    while (!(ancestorClasses = ancestor.classList).contains('nav-menu')) {
      if (ancestor.tagName === 'LI' && ancestorClasses.contains('nav-item')) {
        ancestorClasses.add('is-active', 'is-current-path')
        ids.push(ancestor.dataset.id)
      }
      ancestor = ancestor.parentNode
    }
    navItem.classList.add('is-active')
    return ids
  }

  function getExpandedItems () {
    return find('.is-active', menuPanel).map(function (item) {
      return item.dataset.id
    })
  }

  function getNavState () {
    var data = window.sessionStorage.getItem('nav-state')
    return data && (data = JSON.parse(data)).__version__ === '1' ? data : { __version__: '1' }
  }

  function getMenuState (navState, component, version) {
    var key = version + '@' + component
    return navState[key] || (navState[key] = {})
  }

  function saveNavState () {
    window.sessionStorage.setItem('nav-state', JSON.stringify(navState))
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }
})()
