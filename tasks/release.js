'use strict'

const fs = require('fs')
const octokit = require('@octokit/rest')()
const path = require('path')

module.exports = async (dest, bundleName, owner, repo, tagName, token) => {
  const ref = 'heads/master'
  const message = `Release ${tagName} [skip release]`
  const bundleFile = `${bundleName}-bundle.zip`
  const bundleContent = fs.readFileSync(path.join(dest, bundleFile), 'utf-8')
  const readmeContent = fs.readFileSync('README.adoc', 'utf-8').replace(/^(:current-release: ).+$/m, `$1${tagName}`)
  octokit.authenticate({ type: 'token', token })
  const readmeBlob = await octokit.gitdata.createBlob({ owner, repo, content: readmeContent, encoding: 'utf-8' })
    .then((result) => result.data.sha)
  const commit = await octokit.gitdata.getReference({ owner, repo, ref })
    .then((result) => result.data.object.sha)
  const tree = await octokit.gitdata.getCommit({ owner, repo, commit_sha: commit })
    .then((result) => result.data.tree.sha)
  const newTree = await octokit.gitdata.createTree({
    owner,
    repo,
    tree: [{ path: 'README.adoc', mode: '100644', type: 'blob', sha: readmeBlob }],
    base_tree: tree,
  })
    .then((result) => result.data.sha)
  const newCommit = await octokit.gitdata.createCommit({ owner, repo, message, tree: newTree, parents: [commit] })
    .then((result) => result.data.sha)
  await octokit.gitdata.updateReference({ owner, repo, ref, sha: newCommit })
  const uploadUrl = await octokit.repos.createRelease({
    owner, repo,
    tag_name: tagName,
    target_commitish: newCommit,
    name: tagName,
  })
    .then((result) => result.data.upload_url)
  await octokit.repos.uploadAsset({
    url: uploadUrl,
    file: bundleContent,
    contentLength: bundleContent.length,
    contentType: 'application/zip',
    name: bundleFile,
  })
}
