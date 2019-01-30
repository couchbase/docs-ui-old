#!/bin/env groovy

def githubApiTokenCredentialsId = 'docs-robot-api-key'

def githubApiTokenCredentials = string(credentialsId: githubApiTokenCredentialsId, variable: 'GITHUB_API_TOKEN')

// Jenkins job configuration
// -------------------------
// Category: Multibranch Pipeline
// Pipeline name: release-docs-ui-bundle
// Branch Sources: Single repository & branch
// Name: master
// Source Code Management: Git
// Repository URL: https://github.com/couchbase/docs-ui
// Credentials: - none -
// Refspec: +refs/heads/master:refs/remotes/origin/master
// Branch specifier: refs/heads/master
// Advanced clone behaviors: [ ] Fetch tags, [x] Honor refspec on initial clone, [x] Shallow clone (depth: 3)
// Polling ignores commits with certain messages: (?s)(?:Release v\d+|.*\[skip .+?\]).*
// Build Configuration:
// Mode: by Jenkinsfile
// Script Path: Jenkinsfile
// [x] Discard old items: Days to keep old items: 60
pipeline {
  agent any
  stages {
    stage('Configure') {
      steps {
        script {
          properties([
            [$class: 'GithubProjectProperty', projectUrlStr: 'https://github.com/couchbase/docs-ui'],
            pipelineTriggers([githubPush()]),
          ])
        }
      }
    }
    stage('Install') {
      steps {
        nodejs('node8') {
          sh 'yarn --no-progress --cache-folder=.cache/yarn --pure-lockfile'
        }
      }
    }
    stage('Release') {
      steps {
        dir('public') {
          deleteDir()
        }
        withCredentials([githubApiTokenCredentials]) {
          nodejs('node8') {
            sh '$(npm bin)/gulp release'
          }
        }
      }
    }
  }
}
