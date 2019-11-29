// Returns html as text with given

import { htmlEscape, stringSupplant } from './helpers'

const BOOLEAN_ATTRIBUTES = {
  disabled: true,
  readonly: true,
  multiple: true,
  checked: true
}

function _tagAttrs (attributes) {
  let htmlAttrs = ''
  for (const k in attributes) {
    let v = attributes[k]
    if (BOOLEAN_ATTRIBUTES[k]) {
      v = v ? k : null
    }
    if (v == null) {
      continue
    }
    htmlAttrs += ` ${htmlEscape(k)}="${htmlEscape(v.toString())}"`
  }
  return htmlAttrs
}

/* eslint-disable-next-line no-unused-vars */
export default function (entity, text, attributes, options) {
  const opts = {
    text: text,
    attr: _tagAttrs(attributes)
  }
  return stringSupplant('<a #{attr}>#{text}</a>', opts)
}
