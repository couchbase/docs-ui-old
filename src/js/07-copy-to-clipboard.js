;(function () {
  'use strict'
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var button = document.createElement('a')
    button.className = 'copy-code-button'
    //button.type = 'button'
    button.dataset.title = 'Copy'

    button.addEventListener('click', function () {
      navigator.clipboard.writeText(codeBlock.innerText).then(
        function () {
          /* Chrome doesn't seem to blur automatically,
            leaving the button in a focused state. */
          button.blur()

          button.dataset.title = 'Copied!'

          setTimeout(function () {
            button.dataset.title = 'Copy'
          }, 2000)
        },
        function () {
          button.dataset.title = 'Error'
        }
      )
    })
    var pre = codeBlock.parentNode
    pre.appendChild(button)
  })
})()
