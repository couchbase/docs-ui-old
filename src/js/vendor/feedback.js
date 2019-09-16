;(function () {
  'use strict'

  if (Math.max(window.screen.availHeight, window.screen.availWidth) < 769) return

  window.addEventListener('load', function () {
    var config = document.getElementById('feedback-script').dataset
    var script = document.createElement('script')
    // eslint-disable-next-line max-len
   // script.src = 'https://issues.couchbase.com/s/66cd330397e6b28e6a44bd3d603733a8-T/j9sjl8/802003/be0e2f3d0946caa44cd62a35c9de2f18/3.0.7/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=' + config.collectorId // prettier-ignore
    script.src = 'https://issues.couchbase.com/s/7a5384f36f7448b0198d6cb0bf62765d-T/tv1ord/803004/be0e2f3d0946caa44cd62a35c9de2f18/3.0.10/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=2025633e'
    document.body.appendChild(script)
});



  })
})()
