import extract from './extract'
import autoLink from './autoLink'
import autoHighlight from './autoHighlight'

const defaultOptions = {
  targetBlank: true,
  extractUrlsWithoutProtocol: true
}

export function link (text, options = defaultOptions) {
  const entities = extract(text, options)
  return autoLink(text, entities, options)
}

export function highlight (text, options = defaultOptions) {
  const entities = extract(text, options)
  return autoHighlight(text, entities, options)
}

export function createRange (node, chars, range) {
  if (!range) {
    range = document.createRange()
    range.selectNode(node)
    range.setStart(node, 0)
  }
  if (chars.count === 0) {
    range.setEnd(node, chars.count)
  } else if (node && chars.count > 0) {
    if (node.nodeType === 3) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length
      } else {
        range.setEnd(node, chars.count)
        chars.count = 0
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        range = createRange(node.childNodes[i], chars, range)
        if (chars.count === 0) break
      }
    }
  }
  return range
}

export function setCaretPosition (node, caretPosition) {
  if (caretPosition >= 0) {
    const range = createRange(node, { count: caretPosition })
    const selection = window.getSelection()
    if (range) {
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}
