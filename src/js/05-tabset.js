var hash = window.location.hash
var smallBreak = 768 // Your small screen breakpoint in pixels
find('.doc .tabset').forEach(function (tabset) {
  var active
  var checkActiveClass
  var tabs = tabset.querySelector('.tabs')
  console.log(tabs, window.innerWidth, window.onresize, 8)

  if (tabs) {
    var first
    var dropdownMenu = document.querySelector('.tabs ul')
    find('li', tabs).forEach(function (tab, idx) {
      var id = (tab.querySelector('a[id]') || tab).id
      checkActiveClass = setTimeout(function () {
        var activeTabList = tab.classList.contains('is-active')
        if (activeTabList) {
          // if (window.innerWidth < smallBreak) {
          document.querySelector('.tabs').insertAdjacentHTML('beforebegin', ' <div class="active-tab-item-row"> <a href="#" id="activeTabItem"></a> <div>')
          document.querySelector('.tabs').insertAdjacentHTML('beforeend', '<a href="#" class="dropddown-btn dropdown-btn-down"> More <i class="fas fa-chevron-circle-down"></i> </a>')
          document.getElementById('activeTabItem').innerText = tab.innerText
          console.log(activeTabList.innerText, tab.innerText)
          var dropdownBtn = document.querySelector('.dropdown-btn-down')
          var dropdownBtnIcon = document.querySelector('.dropdown-btn .fas')
          dropdownBtn.addEventListener('click', function (e) {
            e.preventDefault()
            // var x = document.getElementById("myDIV");
            if (dropdownMenu.style.display === 'block' || dropdownMenu.classList.contains('show')) {
             // dropdownMenu.style.display = 'none'
          
             dropdownMenu.classList.remove('show')
             dropdownMenu.classList.add('hide')
             this.querySelector('.fas').classList.add('fa-chevron-circle-down')
             this.querySelector('.fas').classList.remove('fa-chevron-circle-up')
             // this.querySelector('.fas').style.transform = 'rotate(0deg)'
            } else {  
               dropdownMenu.classList.add('show')
              dropdownMenu.classList.remove('hide')
              this.querySelector('.fas').classList.add('fa-chevron-circle-up')
              this.querySelector('.fas').classList.remove('fa-chevron-circle-down')
              //dropdownMenu.style.display = 'block'
            //  this.querySelector('.fas').style.transform = 'rotate(180deg)'
            }
          })
          //}
        }
      }, 100)

      if (!id) return
      var pane = getPane(id, tabset)
      console.log(pane, 17)
      if (!idx) first = { tab: tab, pane: pane }
      if (!active && hash === '#' + id && (active = true)) {
        tab.classList.add('is-active')
        if (pane) pane.classList.add('is-active')
      } else if (!idx) {
        tab.classList.remove('is-active')
        if (pane) pane.classList.remove('is-active')
      }
      tab.addEventListener('click', activateTab.bind({ tabset: tabset, tab: tab, pane: pane }))
    })
    if (!active && first) {
      first.tab.classList.add('is-active')
      if (first.pane) first.pane.classList.add('is-active')
    }
  }
  tabset.classList.remove('is-loading')
  clearTimeout(this.checkActiveClass, 20000)
})

function activateTab (e) {
  var tab = this.tab
  var pane = this.pane
  var dropdownMenu = document.querySelector('.tabs ul')
  var dropdownBtnIcon = document.querySelector('.dropdown-btn-down .fas')
  e.preventDefault()

  find('.tabs li, .tab-pane', this.tabset).forEach(function (it) {
    it === tab || it === pane ? it.classList.add('is-active') : it.classList.remove('is-active')
    var activeTabList = tab.classList.contains('is-active')
    if (activeTabList) {
      // if (window.innerWidth < smallBreak) {
      document.getElementById('activeTabItem').innerText = tab.innerText
      console.log(activeTabList.innerText, tab.innerText)
      dropdownMenu.classList.remove('show')
      dropdownBtnIcon.classList.add('fa-chevron-circle-down')
      dropdownBtnIcon.classList.remove('fa-chevron-circle-up')
      // dropdownMenu.style.display = 'none'
      // dropdownBtnIcon.style.transform = 'rotate(0deg)'
      // }
    }
    console.log(it, activeTabList, 67)
  })
}

function find (selector, from) {
  return Array.prototype.slice.call((from || document).querySelectorAll(selector))
}

function getPane (id, tabset) {
  return find('.tab-pane', tabset).find(function (it) {
    return it.getAttribute('aria-labelledby') === id
  })
}
