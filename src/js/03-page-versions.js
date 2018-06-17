;(function () {
  'use strict'

  var selector = document.querySelector('.page-versions')
  if (!selector) return

  selector.addEventListener('change', function (e) {
    window.location = e.target.value
  })
})()
