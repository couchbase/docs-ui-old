'use strict'

module.exports = (langs, { data: { root } }) => {
  const components = root.site.components
  const thisComponentName = root.page.component.name
  const pageUrl = root.page.url
  return langs
    .split(',')
    .map((lang) => lang + '-sdk')
    .filter((componentName) => componentName !== thisComponentName)
    .map((componentName) => {
      const component = components[componentName]
      if (component) {
        const urlSegments = pageUrl.split('/')
        urlSegments.splice(1, 2, componentName, component.latest.version)
        return { url: urlSegments.join('/'), title: component.title }
      } else {
        return { title: componentName }
      }
    })
}
