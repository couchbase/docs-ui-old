'use strict'

module.exports = (latestVersion, versions) => versions.find((candidate) => candidate.version === latestVersion).url
