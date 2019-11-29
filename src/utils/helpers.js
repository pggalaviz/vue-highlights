const HTML_ENTITIES = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#39;'
}

export function htmlEscape (text) {
  return (
    text &&
    text.replace(/[&"'><]/g, function (character) {
      return HTML_ENTITIES[character]
    })
  )
}

export function clone (o) {
  const r = {}
  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k]
    }
  }
  return r
}

export function stringSupplant (str, map) {
  return str.replace(/#\{(\w+)\}/g, function (match, name) {
    return map[name] || ''
  })
}
