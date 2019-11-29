// Converts URL entity to an html anchor tag.

import { clone, htmlEscape } from './helpers'
import linkToText from './linkToText'

const urlHasProtocol = /^https?:\/\//i

export default function (entity, text, options) {
  let url = entity.url
  const displayUrl = url
  let linkText = htmlEscape(displayUrl)

  const attrs = clone(options.htmlAttrs || {})

  if (!url.match(urlHasProtocol)) {
    url = `http://${url}`
  }
  attrs.href = url

  if (options.targetBlank) {
    attrs.target = '_blank'
  }

  // set class only if urlClass is specified.
  if (options.urlClass) {
    attrs['class'] = options.urlClass
  }

  // set target only if urlTarget is specified.
  if (options.urlTarget) {
    attrs.target = options.urlTarget
  }

  return linkToText(entity, linkText, attrs, options)
}
