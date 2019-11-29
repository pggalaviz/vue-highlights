// Extracts mentions from text.

import { atSigns, endMentionMatch, validMention } from './regex'

export default function (text) {
  if (!text || !text.match(atSigns)) {
    return []
  }

  const mentions = []

  text.replace(validMention, function (match, before, atSign, mentionText, offset, chunk) {
    const after = chunk.slice(offset + match.length)
    if (!after.match(endMentionMatch)) {
      const startPosition = offset + before.length
      const endPosition = startPosition + mentionText.length + 1
      mentions.push({
        username: mentionText,
        indices: [startPosition, endPosition]
      })
    }
  })

  return mentions
}
