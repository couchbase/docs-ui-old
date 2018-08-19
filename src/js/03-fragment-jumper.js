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

  function jumpToAnchorFromUrl (hash) {
    var target, jump
    if (!hash || hash === true) hash = window.location.hash
    if (hash && (target = document.getElementById(hash.slice(1)))) {
      (jump = jumpToAnchor.bind(target))()
      setTimeout(jump, 0)
    }
  }

  function interceptJumps (scope) {
    Array.prototype.slice.call((scope || document).querySelectorAll('a[href^="#"]')).forEach(function (el) {
      if (el.dataset.intercepted) return
      el.dataset.intercepted = true
      var id, target
      if ((id = el.hash.slice(1)) && (target = document.getElementById(id))) {
        el.addEventListener('click', jumpToAnchor.bind(target))
      }
    })
  }

  window.addEventListener('load', function jumpOnLoad () {
    jumpToAnchorFromUrl()
    window.removeEventListener('load', jumpOnLoad)
  })
  interceptJumps(main.parentNode)

  document.addEventListener('fragment-jumper:init', function (e) {
    var detail = e.detail
    interceptJumps(detail.scope)
    if (detail.jump) {
      if (detail.jumpDelay == null) {
        jumpToAnchorFromUrl(detail.jump)
      } else {
        setTimeout(function () { jumpToAnchorFromUrl(detail.jump) }, detail.jumpDelay)
      }
    }
  })
})()
