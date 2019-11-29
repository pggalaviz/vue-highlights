// Extracts Hashtags from text.

import { endHashtagMatch, hashSigns, validHashtag } from './regex'

export default function (text) {
  if (!text || !text.match(hashSigns)) {
    return []
  }

  let tags = []

  text.replace(validHashtag, function (match, before, hash, hashText, offset, chunk) {
    const after = chunk.slice(offset + match.length)
    if (after.match(endHashtagMatch)) {
      return
    }
    const startPosition = offset + before.length
    const endPosition = startPosition + hashText.length + 1
    tags.push({
      hashtag: hashText,
      indices: [startPosition, endPosition]
    })
  })

  return tags
}
