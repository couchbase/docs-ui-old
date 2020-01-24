;(function () {
  'use strict'
  console.log('contributor page')
  var showData = false
  var contributors
  var contributorList = document.getElementById('contributorList')
  var commitdateTag = document.getElementById('commitdate')
  var otherContributor = document.getElementById('otherContributor')
  var contributorListBox = document.querySelector('.contributor-list-box')
  var apiURL = 'https://api.github.com'
  var githubRepo = '/couchbase/docs-ui'
  // var url = 'https://api.github.com/repos/couchbase/docs-ui/stats/contributors'
  // var contributorEveryDayURL = 'repos/couchbase/docs-ui/stats/contributors'
  // Call the fetch function passing the url of the API as a parameter
  // eslint-disable-next-line no-undef
  fetch(apiURL + '/repos' + githubRepo + '/stats/contributors')
    .then(function (resp) {
      var data = resp.json()
      return data
    })
    .then(function (data) {
      showData = true
      contributors = data
      var otherContributorData = contributors.length - 5
      var maxCommitLength = contributors.length - 1
      var maxCommitAuthor = contributors[maxCommitLength]
      // get last commit date
      var totalWeek = maxCommitAuthor.weeks
      var totaltWeekLength = totalWeek.length - 1 // array
      var lastCommitWeek = totalWeek[totaltWeekLength]
      var lastCommitTimeStamp = lastCommitWeek.w // object
      var lastCommitDate = new Date(lastCommitTimeStamp * 1000)// convert timestamp to date
      var getDate = lastCommitDate.getDate()
      var getYear = lastCommitDate.getFullYear()
      // eslint-disable-next-line no-array-constructor
      var month = new Array()
      month[0] = 'January'
      month[1] = 'February'
      month[2] = 'March'
      month[3] = 'April'
      month[4] = 'May'
      month[5] = 'June'
      month[6] = 'July'
      month[7] = 'August'
      month[8] = 'September'
      month[9] = 'October'
      month[10] = 'November'
      month[11] = 'December'
      var getMonth = month[lastCommitDate.getMonth()]
      var latestCommitDate = getMonth + ' ' + getDate + ', ' + getYear
      commitdateTag.append(latestCommitDate)
      otherContributor.append(otherContributorData)

      // show html data
      if (showData) {
        contributorListBox.classList.add('show')
      }
      // map function

      contributors.slice(0).reverse().map(function (contributor, index, arrayobj) {
        //show only top 5 contributor
        if (index <= 4) {
          var contributorAvtar = contributor.author.avatar_url
          // var contributorTotalCommit = contributor.total
          var authorURL = contributor.author.html_url
          // append child in ul
          var li = document.createElement('li')
          var anchor = document.createElement('a')
          var image = document.createElement('img')
          image.setAttribute('src', contributorAvtar)
          image.setAttribute('alt', '')
          anchor.setAttribute('href', authorURL)
          anchor.setAttribute('target', '_blank')
          li.appendChild(anchor)
          anchor.appendChild(image)
          contributorList.appendChild(li)
        }
      })
    }).catch(function (err) {
      console.log(err, 13)
    })
})()
