;(function () {
  'use strict'

  var dialogBox = document.getElementById('dialogBox')
  var helpYesBtn = document.getElementById('yesBtn')
  helpYesBtn.addEventListener('click', function (e) {
    dialogBox.style.display = 'block'
    this.classList.add('active')
    helpNoBtn.classList.remove('active')
  })

  var helpNoBtn = document.getElementById('noBtn')
  helpNoBtn.addEventListener('click', function (e) {
    dialogBox.style.display = 'block'
    this.classList.add('active')
    helpYesBtn.classList.remove('active')
  })

  var skipBtn = document.getElementById('skipBtn')
  skipBtn.addEventListener('click', function (e) {
    dialogBox.style.display = 'none'
  })

})()
