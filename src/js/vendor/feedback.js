;(function () {
  'use strict'

  if (Math.max(window.screen.availHeight, window.screen.availWidth) < 769) return

  window.addEventListener('load', function () {
    var config = document.getElementById('feedback-script').dataset
    var script = document.createElement('script')
    // eslint-disable-next-line max-len
    script.src = 'https://issues.couchbase.com/s/4e5aeb929d05d6c94d980322c73e6ee4-T/n8ktcf/805004/be0e2f3d0946caa44cd62a35c9de2f18/4.0.0/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=en-US&collectorId=' + config.collectorId // prettier-ignore
    document.body.appendChild(script)
  })
})()
