;(function () {
  'use strict'

  var searchButton = document.querySelector('button.search')
  if (!searchButton) return
  searchButton.addEventListener('click', function (e) {
    var navbarStart = document.querySelector('.navbar-start')
    navbarStart.classList.toggle('reveal-search-input')
    var searchQuery = navbarStart.querySelector('.query')
    searchQuery.value = ''
    searchQuery.focus()
    e.preventDefault()
  })
})()
