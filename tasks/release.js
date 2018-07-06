'use strict'

const fs = require('fs')
const octokit = require('@octokit/rest')()
const path = require('path')
const readFile = require('util').promisify(fs.readFile)

module.exports = async (dest, bundleName, owner, repo, token) => {
  octokit.authenticate({ type: 'token', token })
  const {
    data: { tag_name: lastTagName },
  } = await octokit.repos.getLatestRelease({ owner, repo }).catch(() => ({ data: { tag_name: 'v0' } }))
  const tagName = `v${Number(lastTagName.substr(1)) + 1}`
  const ref = 'heads/master'
  const message = `Release ${tagName}`
  const bundleFile = `${bundleName}-bundle.zip`
  const bundleContent = await readFile(path.join(dest, bundleFile), 'binary')
  const readmeContent = await readFile('README.adoc', 'utf-8')
    .then((contents) => contents.replace(/^(:current-release: ).+$/m, `$1${tagName}`))
  const readmeBlob = await octokit.gitdata
    .createBlob({ owner, repo, content: readmeContent, encoding: 'utf-8' })
    .then((result) => result.data.sha)
  const commit = await octokit.gitdata.getReference({ owner, repo, ref }).then((result) => result.data.object.sha)
  const tree = await octokit.gitdata
    .getCommit({ owner, repo, commit_sha: commit })
    .then((result) => result.data.tree.sha)
  const newTree = await octokit.gitdata
    .createTree({
      owner,
      repo,
      tree: [{ path: 'README.adoc', mode: '100644', type: 'blob', sha: readmeBlob }],
      base_tree: tree,
    })
    .then((result) => result.data.sha)
  const newCommit = await octokit.gitdata
    .createCommit({ owner, repo, message, tree: newTree, parents: [commit] })
    .then((result) => result.data.sha)
  await octokit.gitdata.updateReference({ owner, repo, ref, sha: newCommit })
  const uploadUrl = await octokit.repos
    .createRelease({
      owner,
      repo,
      tag_name: tagName,
      target_commitish: newCommit,
      name: tagName,
    })
    .then((result) => result.data.upload_url)
  await octokit.repos.uploadAsset({
    url: uploadUrl,
    file: bundleContent,
    name: bundleFile,
    contentLength: bundleContent.length,
    contentType: 'application/zip',
  })
}
