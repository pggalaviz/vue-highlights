// Returns an Indexed Array with URL, mention and hashtag
// entities found in text.

import extractMentions from './extractMentions'
import extractHashtags from './extractHashtags'
import extractUrls from './extractUrls'
import removeOverlappingEntities from './removeOverlappingEntities'

export default function (text, options) {
  const entities = extractUrls(text, options)
    .concat(extractMentions(text))
    .concat(extractHashtags(text))

  if (entities.length === 0) {
    return []
  }

  removeOverlappingEntities(entities)
  return entities
}
