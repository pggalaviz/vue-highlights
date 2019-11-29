// Converts mention entity to an html anchor tag.

import { clone, htmlEscape } from './helpers'
import linkToText from './linkToText'

export default function (entity, text, options) {
  const at = text.substring(entity.indices[0], entity.indices[0] + 1)
  const user = htmlEscape(entity.username)
  const attrs = clone(options.htmlAttrs || {})

  attrs.href = options.usernameUrlBase + user
  attrs.title = `@${user}`
  attrs['class'] = options.usernameClass
  attrs['data-username'] = user

  return linkToText(entity, `${at}${user}`, attrs, options)
}
