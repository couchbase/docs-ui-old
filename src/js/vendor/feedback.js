;(function () {
  'use strict'

  if (Math.max(window.screen.availHeight, window.screen.availWidth) < 769) return

  window.addEventListener('load', function () {
    var config = document.getElementById('feedback-script').dataset
    var script = document.createElement('script')
    script.src = 'https://issues.couchbase.com/s/df1d14c9d77c1ad1c4ef2db3d8d7da3f-T/-6ikjte/73013/c4d560fe7f608200148fbd40cb0f35ae/2.0.23/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=' + config.collectorId // eslint-disable-line max-len
    document.body.appendChild(script)
  })
})()
