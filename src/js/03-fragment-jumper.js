;(function () {
  'use strict'

  var main = document.querySelector('main')
  var ceiling = document.getElementById(main.dataset.ceiling)

  function computePosition (el, sum) {
    return main.contains(el) ? computePosition(el.offsetParent, el.offsetTop + sum) : sum
  }

  function jumpToAnchor (e) {
    if (e) {
      window.location.hash = '#' + this.id
      e.preventDefault()
    }
    window.scrollTo(0, computePosition(this, 0) - ceiling.getBoundingClientRect().bottom - 20)
  }

  function jumpToAnchorFromUrl (e) {
    var hash, target, jump
    if ((hash = window.location.hash) && (target = document.getElementById(hash.slice(1)))) {
      (jump = jumpToAnchor.bind(target))()
      setTimeout(jump, 0)
    }
    if (e) window.removeEventListener(e.type, jumpToAnchorFromUrl)
  }

  function interceptJumps (container) {
    Array.prototype.slice.call(container.querySelectorAll('a[href^="#"]')).forEach(function (el) {
      var hash, target
      if ((hash = el.hash.slice(1)) && (target = document.getElementById(hash))) {
        el.addEventListener('click', jumpToAnchor.bind(target))
      }
    })
  }

  window.addEventListener('load', jumpToAnchorFromUrl)
  interceptJumps(main.parentNode)

  window.addEventListener('fragment-jumper:update', function (e) {
    interceptJumps(e.container)
    if (e.load) jumpToAnchorFromUrl()
  })
})()
