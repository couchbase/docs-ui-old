;(function () {
  'use strict'

  var dialogBox = document.getElementById('dialogBox')
  var helpBtn = document.getElementById('yesBtn')
  helpBtn.addEventListener('click', function (e) {
    dialogBox.style.display = 'block'
  })

  var helpNoBtn = document.getElementById('noBtn')
  helpNoBtn.addEventListener('click', function (e) {
    dialogBox.style.display = 'block'
  })
})()
