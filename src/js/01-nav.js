;(function () {
  'use strict'

  var navMenu = {}
  if (!(navMenu.element = document.querySelector('.nav-menu'))) return

  var currentPageItem = navMenu.element.querySelector('.is-current-page')
  if (currentPageItem) expandCurrentPath(currentPageItem)

  find('.nav-toggle', navMenu.element).forEach(function (toggleButton) {
    var navItem = findAncestorWithClass('nav-item', toggleButton, navMenu.element)
    toggleButton.addEventListener('click', function () {
      navItem.classList.toggle('is-active')
    })
  })

  if (navMenu.element.classList.contains('fit')) {
    window.addEventListener('load', fitNavMenuInit)
  } else if (currentPageItem) {
    scrollItemIntoView(currentPageItem.querySelector('.nav-link'), navMenu.element)
  }

  function expandCurrentPath (navItem) {
    navItem.classList.add('is-active')
    var ancestorClasses
    var ancestor = navItem
    while ((ancestor = ancestor.parentNode) !== navMenu.element) {
      if ((ancestorClasses = ancestor.classList).contains('nav-item')) {
        ancestorClasses.add('is-active', 'is-current-path')
      }
    }
  }

  function scrollItemIntoView (el, parentEl) {
    var belowBottom = (el.offsetTop + el.offsetHeight + 8) - parentEl.offsetHeight
    if (belowBottom > 0) parentEl.scrollTop = belowBottom
  }

  function fitNavMenuInit (e) {
    window.removeEventListener('scroll', fitNavMenuOnScroll)
    navMenu.element.style.height = ''
    if ((navMenu.preferredHeight = navMenu.element.getBoundingClientRect().height) > 0) {
      if (!navMenu.encroachingElement) navMenu.encroachingElement = document.querySelector('footer.footer')
      fitNavMenu(navMenu.preferredHeight, (navMenu.viewHeight = window.innerHeight), navMenu.encroachingElement)
      if (e.type === 'load' && currentPageItem) {
        scrollItemIntoView(currentPageItem.querySelector('.nav-link'), navMenu.element)
      }
      window.addEventListener('scroll', fitNavMenuOnScroll)
    } else {
      window.removeEventListener('scroll', fitNavMenuOnScroll)
    }
    if (e.type === 'load') {
      window.removeEventListener('load', fitNavMenuInit)
      window.addEventListener('resize', fitNavMenuInit)
    }
  }

  function fitNavMenuOnScroll () {
    fitNavMenu(navMenu.preferredHeight, navMenu.viewHeight, navMenu.encroachingElement)
  }

  function fitNavMenu (preferredHeight, availableHeight, encroachingElement) {
    var reclaimedHeight = availableHeight - encroachingElement.getBoundingClientRect().top
    navMenu.element.style.height = reclaimedHeight > 0 ? Math.max(0, (preferredHeight - reclaimedHeight)) + 'px' : ''
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }

  function findAncestorWithClass (className, from, scope) {
    if ((from = from.parentNode) !== scope) {
      if (from.classList.contains(className)) {
        return from
      } else {
        return findAncestorWithClass(className, from, scope)
      }
    }
  }
})()
