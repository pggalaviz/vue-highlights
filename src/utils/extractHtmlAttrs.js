const BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}

// Options which should not be passed as HTML attributes
const OPTIONS_NOT_ATTRIBUTES = {
  urlClass: true,
  usernameClass: true,
  hashtagClass: true,
  usernameUrlBase: true,
  hashtagUrlBase: true,
  targetBlank: true,
  urlTarget: true,
  invisibleTagAttrs: true,
  linkAttributeBlock: true,
  htmlEscapeNonEntities: true,
  extractUrlsWithoutProtocol: true
}

export default function (options) {
  const htmlAttrs = {}
  for (const k in options) {
    let v = options[k]
    if (OPTIONS_NOT_ATTRIBUTES[k]) {
      continue
    }
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null
    }
    if (v == null) {
      continue
    }
    htmlAttrs[k] = v
  }
  return htmlAttrs
}
