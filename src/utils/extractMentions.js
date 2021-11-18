// Extracts mentions from text.

import { atSigns, endMentionMatch, validMention, validDotMention } from './regex'

export default function (text, options) {
  if (!text || !text.match(atSigns)) {
    return []
  }

  const mentions = []
  const mentionRegex = options.mentionsWithDots ? validDotMention : validMention

  text.replace(mentionRegex, function (match, before, atSign, mentionText, offset, chunk) {
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
