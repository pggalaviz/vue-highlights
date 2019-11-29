// Inserts a <span> tag with given css classes around matched url,
// mentions or hashtags in text.

import { htmlEscape, clone, stringSupplant } from './helpers'

const DEFAULT_USERNAME_CLASS = 'highlights username'
const DEFAULT_HASHTAG_CLASS = 'highlights hashtag'
const DEFAULT_URL_CLASS = 'highlights url'

export default function (text, entities, opts) {
  let result = ''
  let beginIndex = 0
  const options = clone(opts || {})
  const usernameClass = options.usernameClass || DEFAULT_USERNAME_CLASS
  const hashtagClass = options.hashtagClass || DEFAULT_HASHTAG_CLASS
  const urlClass = options.urlClass || DEFAULT_URL_CLASS

  // sort entities by start index
  entities.sort(function (a, b) {
    return a.indices[0] - b.indices[0]
  })

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i]
    result += htmlEscape(text.substring(beginIndex, entity.indices[0]))

    if (entity.url) {
      let url = htmlEscape(entity.url)
      result += _insertTag(url, urlClass)
    } else if (entity.username) {
      const at = text.substring(entity.indices[0], entity.indices[0] + 1)
      const user = htmlEscape(entity.username)
      result += _insertTag(`${at}${user}`, usernameClass)
    } else if (entity.hashtag) {
      const hash = text.substring(entity.indices[0], entity.indices[0] + 1)
      const tag = htmlEscape(entity.hashtag)
      result += _insertTag(`${hash}${tag}`, hashtagClass)
    }
    beginIndex = entity.indices[1]
  }
  result += htmlEscape(text.substring(beginIndex, text.length))
  return result
}

// =================
// Private Functions
// =================

function _insertTag (text, classes = '') {
  const opts = {
    text: text,
    attr: `class="${classes}"`
  }
  return stringSupplant('<span #{attr}>#{text}</span>', opts)
}
