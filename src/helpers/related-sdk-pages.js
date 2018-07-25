'use strict'

const SDK_TITLES = {
  'c-sdk': 'C SDK',
  'dotnet-sdk': '.NET SDK',
  'go-sdk': 'Go SDK',
  'java-sdk': 'Java SDK',
  'nodejs-sdk': 'Node.js SDK',
  'php-sdk': 'PHP SDK',
  'python-sdk': 'Python SDK',
}

module.exports = (componentName, url, sdks) =>
  sdks.split(',').filter((sdk) => !sdk.startsWith(componentName)).map((sdk) => {
    const [name, version] = sdk.split('/')
    const urlSegments = url.split('/')
    urlSegments.splice(1, 2, name, version)
    return { url: urlSegments.join('/'), title: SDK_TITLES[name] }
  })
