'use strict'

const asciidoctor = require('asciidoctor.js')()
const fs = require('fs-extra')
const handlebars = require('handlebars')
const { obj: map } = require('through2')
const merge = require('merge-stream')
const ospath = require('path')
const path = ospath.posix
const requireFromString = require('require-from-string')
const vfs = require('vinyl-fs')
const yaml = require('js-yaml')

const ASCIIDOC_ATTRIBUTES = {
  experimental: '',
  icons: 'font',
  sectanchors: '',
  'source-highlighter': 'highlight.js',
}

module.exports = (src, previewSrc, previewDest, sink = () => map(), layouts = {}) => () =>
  Promise.all([
    loadSampleUiModel(previewSrc),
    toPromise(
      merge(
        compileLayouts(src, layouts),
        registerHelpers(src),
        registerPartials(src),
        copyImages(previewSrc, previewDest)
      )
    ),
  ])
    .then(([baseUiModel]) =>
      vfs
        .src('**/*.adoc', { base: previewSrc, cwd: previewSrc })
        .pipe(
          map((file, enc, next) => {
            const siteRootPath = path.relative(ospath.dirname(file.path), ospath.resolve(previewSrc))
            const uiModel = { ...baseUiModel }
            uiModel.siteRootPath = siteRootPath
            uiModel.siteRootUrl = path.join(siteRootPath, 'index.html')
            uiModel.uiRootPath = path.join(siteRootPath, '_')
            if (file.stem === '404') {
              uiModel.page = { layout: '404', title: 'Page Not Found' }
            } else {
              const pageModel = uiModel.page = { ...uiModel.page }
              const doc = asciidoctor.load(file.contents, { safe: 'safe', attributes: ASCIIDOC_ATTRIBUTES })
              const attributes = doc.getAttributes()
              pageModel.layout = doc.getAttribute('page-layout', 'default')
              pageModel.title = doc.getDocumentTitle()
              pageModel.url = '/' + file.relative.slice(0, -5) + '.html'
              if (file.stem === 'home') pageModel.home = true
              const componentName = doc.getAttribute('page-component-name', pageModel.src.component)
              const versionString = doc.getAttribute('page-version',
                (doc.hasAttribute('page-component-name') ? undefined : pageModel.src.version))
              let component
              let componentVersion
              if (componentName) {
                component = pageModel.component = uiModel.site.components[componentName]
                componentVersion = pageModel.componentVersion = versionString
                  ? component.versions.find(({ version }) => version === versionString)
                  : component.latest
              } else {
                component = pageModel.component = Object.values(uiModel.site.components)[0]
                componentVersion = pageModel.componentVersion = component.latest
              }
              pageModel.module = 'ROOT'
              pageModel.version = componentVersion.version
              pageModel.displayVersion = componentVersion.displayVersion
              pageModel.editUrl = pageModel.origin.editUrlPattern.replace('%s', file.relative)
              pageModel.navigation = componentVersion.navigation || []
              pageModel.breadcrumbs = findNavPath(pageModel.url, pageModel.navigation)
              pageModel.versions = pageModel.component.versions.map(({ version, displayVersion, url }, idx, arr) => {
                const pageVersion = { version, displayVersion: displayVersion || version, url }
                if (version === component.latest.version) pageVersion.latest = true
                if (idx === arr.length - 1) {
                  delete pageVersion.url
                  pageVersion.missing = true
                }
                return pageVersion
              })
              pageModel.attributes = Object.entries({ ...attributes, ...componentVersion.asciidoc.attributes })
                .filter(([name, val]) => name.startsWith('page-'))
                .reduce((accum, [name, val]) => ({ ...accum, [name.substr(5)]: val }), {})
              pageModel.contents = Buffer.from(doc.convert())
            }
            file.extname = '.html'
            file.contents = Buffer.from(layouts[uiModel.page.layout](uiModel))
            next(null, file)
          })
        )
        .pipe(vfs.dest(previewDest))
        .pipe(sink())
    )

function loadSampleUiModel (src) {
  return fs.readFile(ospath.join(src, 'ui-model.yml'), 'utf8').then((contents) => {
    const uiModel = yaml.safeLoad(contents)
    uiModel.env = process.env
    Object.entries(uiModel.site.components).forEach(([name, component]) => {
      component.name = name
      if (!component.versions) component.versions = [(component.latest = { url: '#' })]
      component.versions.forEach((version) => {
        Object.defineProperty(version, 'name', { value: component.name, enumerable: true })
        if (!('displayVersion' in version)) version.displayVersion = version.version
        if (!('asciidoc' in version)) version.asciidoc = { attributes: {} }
      })
      Object.defineProperties(component, {
        asciidoc: {
          get () {
            return this.latest.asciidoc
          },
        },
        title: {
          get () {
            return this.latest.title
          },
        },
        url: {
          get () {
            return this.latest.url
          },
        },
      })
    })
    return uiModel
  })
}

function registerPartials (src) {
  return vfs.src('partials/*.hbs', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      handlebars.registerPartial(file.stem, file.contents.toString())
      next()
    })
  )
}

function registerHelpers (src) {
  handlebars.registerHelper('relativize', relativize)
  handlebars.registerHelper('resolvePage', resolvePage)
  handlebars.registerHelper('resolvePageURL', resolvePageURL)
  return vfs.src('helpers/*.js', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      handlebars.registerHelper(file.stem, requireFromString(file.contents.toString()))
      next()
    })
  )
}

function compileLayouts (src, layouts) {
  return vfs.src('layouts/*.hbs', { base: src, cwd: src }).pipe(
    map((file, enc, next) => {
      layouts[file.stem] = handlebars.compile(file.contents.toString(), { preventIndent: true })
      next()
    })
  )
}

function copyImages (src, dest) {
  return vfs.src('**/*.{png,svg}', { base: src, cwd: src }).pipe(vfs.dest(dest))
}

function findNavPath (currentUrl, node = [], current_path = [], root = true) {
  for (const item of node) {
    const { url, items } = item
    if (url === currentUrl) {
      return current_path.concat(item)
    } else if (items) {
      const activePath = findNavPath(currentUrl, items, current_path.concat(item), false)
      if (activePath) return activePath
    }
  }
  if (root) return []
}

function relativize (url) {
  return url ? (url.charAt() === '#' ? url : url.slice(1)) : '#'
}

function resolvePage (spec, context = {}) {
  if (spec) return { pub: { url: resolvePageURL(spec) } }
}

function resolvePageURL (spec, context = {}) {
  if (spec) return '/' + spec.slice(0, spec.lastIndexOf('.')) + '.html'
}

function toPromise (stream) {
  return new Promise((resolve, reject) => stream.on('error', reject).on('finish', resolve))
}
