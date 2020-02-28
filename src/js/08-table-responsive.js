;(function () {
  'use strict'
  /* table js */

  var smallBreak = 768 // Your small screen breakpoint in pixels
  var tables = document.querySelectorAll('table.tableblock')

  window.onload = function () {
    shapeTable()
  }
  window.addEventListener('resize', function () {
    shapeTable()
  })

  function shapeTable () {
    if (window.innerWidth < smallBreak) {
      tables.forEach(function (elem, index) {
        // console.log(elem.querySelector('tr'))

        var columns = elem.querySelectorAll('tbody tr').length
        var rows = elem.querySelectorAll('thead tr th').length
        for (var i = 1; i <= rows; i++) {
          var ele = elem.querySelectorAll('th')
          if (ele[i] !== undefined) {
            var maxHeight = ele[i].offsetHeight
          }

          for (var j = 1; j <= columns; j++) {
            // console.log(i, j, 23)
            if (elem.querySelector('tr:nth-child(' + j + ') td:nth-child(' + i + ')') != null &&
            elem.querySelector(' tr:nth-child(' + j + ') td:nth-child(' + i + ')') !== undefined) {
              // console.log(elem.querySelector('tr:nth-child(' + j + ') td:nth-child(' + i + ')'), 25)
              if (elem.querySelector('tr:nth-child(' + j + ') td:nth-child(' + i + ')').offsetHeight > maxHeight) {
                maxHeight = elem.querySelector('tr:nth-child(' + j + ') td:nth-child(' + i + ')').offsetHeight
              }
              if (elem.querySelectorAll('tr:nth-child(' + j + ') td:nth-child(' + i + ')').scrollHeight >
              elem.querySelector('tr:nth-child(' + j + ') td:nth-child(' + i + ')').offsetHeight) {
                maxHeight = elem.querySelectorAll('tr:nth-child(' + j + ') td:nth-child(' + i + ')').scrollHeight
              }
            }
          }
          for (var k = 1; k <= columns; k++) {
            if (elem.querySelector('tr:nth-child(' + k + ') td:nth-child(' + i + ')') != null && elem.querySelector(
              'tr:nth-child(' + k + ') td:nth-child(' + i + ')') !== undefined) {
              elem.querySelector('tr:nth-child(' + k + ') td:nth-child(' + i + ')').style.height = maxHeight + 'px'
              elem.querySelector('th:nth-child(' + i + ')').style.height = maxHeight + 'px'
            }
          }
        }
      })
    } else {
      // document.querySelectorAll('table.tableblock td, table.tableblock th')[0].removeAttribute('style')
      document.querySelectorAll('table.tableblock tbody tr td, table.tableblock thead tr th').forEach(
        function (elem, ind) { elem.style.height = 'auto' })
    }
  }
})()
