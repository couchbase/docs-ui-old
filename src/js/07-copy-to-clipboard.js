;(function () {
  'use strict'
  // var codeBlock = document.querySelectorAll('pre > code')
  // codeBlock.forEach(function (userItem) {
  //   console.log(userItem)
  //   var node = document.createElement('i')
  //   var textnode = document.createTextNode('copy')
  //   node.appendChild(textnode)
  //   var attr = document.createAttribute('class')
  //   var attrTitle = document.createAttribute('id')
  //   attr.value = 'copy-clipboard'
  //   attrTitle.value = 'copy'
  //   node.setAttributeNode(attr)
  //   node.setAttributeNode(attrTitle)
  //   userItem.after(node)
  // })
  function myFunction () {
    // var copyText = document.querySelectorAll('.copy-clipboard')
    // copyText.forEach(function (clipItem) {
    //   console.log(clipItem)
    // })
    // copyText.select()
    // copyText.setSelectionRange(0, 99999)
    // document.execCommand('copy')
    // console.log('Copied the text: ' + copyText.value)
  }
  myFunction()
  //function addCopyButtons (clipboard) {
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
    // if (pre.parentNode.classList.contains('highlight')) {
    //   var highlight = pre.parentNode
    //   highlight.parentNode.insertBefore(button, highlight)
    // } else {
    pre.appendChild(button)
    // }
  })
  // }
  // addCopyButtons()
})()
