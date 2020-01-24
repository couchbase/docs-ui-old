;(function () {
  'use strict'
  console.log('contributor page')
  var contributors
  var contributorList = document.getElementById('contributorList')
  var commitdateTag = document.getElementById('commitdate')
  var otherContributor = document.getElementById('otherContributor')
  // var apiURL = 'https://api.github.com'
  // var contributorEveryDayURL = 'repos/couchbase/docs-ui/stats/contributors'
  // Call the fetch function passing the url of the API as a parameter
  // eslint-disable-next-line no-undef
  fetch('https://api.github.com/repos/couchbase/docs-ui/stats/contributors')
    .then(function (resp) {
      var data = resp.json()
      return data
    })
    .then(function (data) {
      contributors = data
      var otherContributorData = contributors.length - 5
      var maxCommitLength = contributors.length - 1
      var maxCommitAuthor = contributors[maxCommitLength]
      // get last commit date
      var totalWeek = maxCommitAuthor.weeks
      var totaltWeekLength = totalWeek.length - 1 // array
      var lastCommitWeek = totalWeek[totaltWeekLength]
      var lastCommitTimeStamp = lastCommitWeek.w // object
      var lastCommitDate = new Date(lastCommitTimeStamp * 1000).toDateString() // convert timestamp to date
      console.log(lastCommitDate, maxCommitAuthor)
      commitdateTag.append(lastCommitDate)
      otherContributor.append(otherContributorData)
      // map function

      contributors.slice(0).reverse().map(function (contributor, index, arrayobj) {
        console.log(contributor, index, arrayobj, 19)
        //show only top 5 contributor
        if (index <= 4) {
          var contributorAvtar = contributor.author.avatar_url
          var contributorTotalCommit = contributor.total
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

          console.log(contributorAvtar, contributorTotalCommit, 21)
        }
      })
    }).catch(function (err) {
      console.log(err, 13)
    })
})()
