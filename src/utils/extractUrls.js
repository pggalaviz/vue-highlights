// Extracts URLs from text

import { extractUrl, validAsciiDomain } from './regex'
import idna from './idna'

const DEFAULT_PROTOCOL = 'https://'
const DEFAULT_PROTOCOL_OPTIONS = { extractUrlsWithoutProtocol: true }
const MAX_URL_LENGTH = 4096

const invalidUrlWithoutProtocolPrecedingChars = /[-_./]$/

function isValidUrl (url, protocol, domain) {
  let urlLength = url.length
  const punycodeEncodedDomain = idna.toAscii(domain)
  if (!punycodeEncodedDomain || !punycodeEncodedDomain.length) {
    return false
  }

  urlLength = urlLength + punycodeEncodedDomain.length - domain.length
  return protocol.length + urlLength <= MAX_URL_LENGTH
}

const extractUrlsWithIndices = function (text, options = DEFAULT_PROTOCOL_OPTIONS) {
  if (!text || (options.extractUrlsWithoutProtocol ? !text.match(/\./) : !text.match(/:/))) {
    return []
  }

  const urls = []

  while (extractUrl.exec(text)) {
    const before = RegExp.$2
    let url = RegExp.$3
    const protocol = RegExp.$4
    const domain = RegExp.$5
    const path = RegExp.$7
    let endPosition = extractUrl.lastIndex
    const startPosition = endPosition - url.length

    if (!isValidUrl(url, protocol || DEFAULT_PROTOCOL, domain)) {
      continue
    }
    // extract ASCII-only domains.
    if (!protocol) {
      if (!options.extractUrlsWithoutProtocol || before.match(invalidUrlWithoutProtocolPrecedingChars)) {
        continue
      }

      let lastUrl = null
      let asciiEndPosition = 0
      domain.replace(validAsciiDomain, function (asciiDomain) {
        const asciiStartPosition = domain.indexOf(asciiDomain, asciiEndPosition)
        asciiEndPosition = asciiStartPosition + asciiDomain.length
        lastUrl = {
          url: asciiDomain,
          indices: [startPosition + asciiStartPosition, startPosition + asciiEndPosition]
        }
        urls.push(lastUrl)
      })

      // no ASCII-only domain found. Skip the entire URL.
      if (lastUrl == null) {
        continue
      }

      // lastUrl only contains domain. Need to add path and query if they exist.
      if (path) {
        lastUrl.url = url.replace(domain, lastUrl.url)
        lastUrl.indices[1] = endPosition
      }
    } else {
      urls.push({
        url: url,
        indices: [startPosition, endPosition]
      })
    }
  }

  return urls
}

export default extractUrlsWithIndices
