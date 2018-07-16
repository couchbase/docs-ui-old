;(function () {
  'use strict'

  var navMenu = document.querySelector('.nav-menu')
  if (!navMenu) return

  if (navMenu.classList.contains('fit')) {
    var footer = document.querySelector('footer')
    // TODO to make more efficient, recompute base info on window resize
    // TODO need to set up on load
    var navMenuStartHeight = navMenu.getBoundingClientRect().height
    var availableHeight = window.innerHeight

    window.addEventListener('scroll', function () {
      var footerVisibleHeight = availableHeight - footer.getBoundingClientRect().top
      if (footerVisibleHeight > 0) {
        navMenu.style.height = Math.max(0, (navMenuStartHeight - footerVisibleHeight)) + 'px'
      } else {
        navMenu.style.height = ''
      }
    })
  }

  var navState = getNavState()
  // FIXME look for component and version in head > meta instead
  var menuState = getMenuState(navState, navMenu.dataset.component, navMenu.dataset.version)

  find('.nav-toggle', navMenu).forEach(function (btn) {
    // FIXME change this to search ancestors
    var li = btn.parentElement.parentElement
    btn.addEventListener('click', function () {
      li.classList.toggle('is-active')
      menuState.expandedItems = getExpandedItems(navMenu)
      saveNavState()
    })
  })

  find('.nav-item', navMenu).forEach(function (item, idx) {
    item.setAttribute('data-id', 'menu-' + item.dataset.depth + '-' + idx)
  })

  var expandedItems = menuState.expandedItems || (menuState.expandedItems = [])

  var currentPageItem = navMenu.querySelector('.is-current-page')
  if (currentPageItem) {
    activateCurrentPath(currentPageItem).forEach(function (itemId) {
      if (expandedItems.indexOf(itemId) < 0) expandedItems.push(itemId)
    })
  }

  saveNavState()

  scrollItemIntoView(0, navMenu, currentPageItem && currentPageItem.querySelector('.nav-link'))

  function activateCurrentPath (navItem) {
    var ids = [navItem.dataset.id]
    var ancestorClasses
    var ancestor = navItem.parentNode
    // TODO could compare to navMenu here
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

  function getExpandedItems (scope) {
    return find('.is-active', scope).map(function (item) {
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

  function scrollItemIntoView (scrollPosition, parent, el) {
    if (!el) return (parent.scrollTop = scrollPosition)

    var margin = 16
    var overTheTop = el.offsetTop - scrollPosition < 0
    var belowTheBottom = el.offsetTop - scrollPosition + el.offsetHeight > parent.offsetHeight

    if (overTheTop) {
      parent.scrollTop = el.offsetTop - margin
    } else if (belowTheBottom) {
      parent.scrollTop = el.offsetTop - (parent.offsetHeight - el.offsetHeight) + margin
    } else {
      parent.scrollTop = scrollPosition
    }
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }
})()
