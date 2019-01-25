#!/bin/env groovy

def githubApiTokenCredentialsId = 'docs-robot-api-key'

def githubApiTokenCredentials = string(credentialsId: githubApiTokenCredentialsId, variable: 'GITHUB_API_TOKEN')

// Jenkins job configuration
// -------------------------
// Category: Pipeline
// Pipeline name: release-docs-ui-bundle
// [x] Do not allow concurrent builds
// GitHub Project: https://github.com/couchbase/docs-ui/
// [x] GitHub hook trigger for GITScm polling
// Pipeline Definition: Pipeline script from SCM
// SCM: Git
// Repository URL: https://github.com/couchbase/docs-ui
// Refspec: +refs/heads/master:refs/remotes/origin/master
// Branch specifier: refs/heads/master
// Advanced clone behaviors: [ ] Fetch tags, [x] Honor refspec on initial clone, [x] Shallow clone (depth: 3)
// Polling ignores commits with certain messages: (?s)(?:Release v\d+|.*\[skip .+?\]).*
// Script path: Jenkinsfile
// [x] Lightweight checkout
pipeline {
  agent {
    docker {
      image 'node:8-slim'
    }
  }
  stages {
    stage('Install') {
      steps {
        sh 'yarn --cache-folder=.cache/yarn --pure-lockfile'
      }
    }
    stage('Release') {
      steps {
        dir('public') {
          deleteDir()
        }
        withCredentials([githubApiTokenCredentials]) {
          sh '$(npm bin)/gulp release'
        }
      }
    }
  }
}
