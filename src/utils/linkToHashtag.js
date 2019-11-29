// Converts hashtag entity to an html anchor tag.

import { clone, htmlEscape } from './helpers'
import linkToText from './linkToText'

const rtlChars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm

export default function (entity, text, options) {
  const hash = text.substring(entity.indices[0], entity.indices[0] + 1)
  const hashtag = htmlEscape(entity.hashtag)
  const attrs = clone(options.htmlAttrs || {})

  attrs.href = options.hashtagUrlBase + hashtag
  attrs.title = `#${hashtag}`
  attrs['class'] = options.hashtagClass
  attrs['data-hashtag'] = hashtag
  if (hashtag.charAt(0).match(rtlChars)) {
    attrs['class'] += ' rtl'
  }

  return linkToText(entity, `${hash}${hashtag}`, attrs, options)
}
