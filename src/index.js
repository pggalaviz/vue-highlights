import { link, highlight, setCaretPosition } from './utils'

export function autoHighlight (text, options) {
  return highlight(text, options)
}

export function autoLink (text, options) {
  return link(text, options)
}

export default {
  name: 'VueHighlights',
  props: {
    extractUrlsWithoutProtocol: {
      type: Boolean,
      default: true
    },
    caretColor: {
      type: String,
      default: '#ccc'
    },
    placeholder: {
      type: String,
      default: `What's Happening?`
    },
    value: String
  },
  data () {
    return {
      focused: false,
      body: ''
    }
  },
  computed: {
    showPlaceholder () {
      return !this.body.replace(/^\s*\n/gm, '').length
    },
    computedBody () {
      return highlight(this.body, {
        extractUrlsWithoutProtocol: this.extractUrlsWithoutProtocol
      })
    }
  },
  methods: {
    getCaretPos () {
      const parent = this.$refs.mbody
      const selection = window.getSelection()
      let node = selection.focusNode
      let charCount = selection.focusOffset
      while (node) {
        if (node === parent) break
        if (node.previousSibling) {
          node = node.previousSibling
          charCount += node.textContent.length
        } else {
          node = node.parentNode
          if (node === null) break
        }
      }
      return charCount
    },
    setCaretPos (caretPosition) {
      setCaretPosition(this.$refs.mbody, caretPosition)
    },
    clear () {
      this.$refs.mbody.innerText = ''
      this.body = ''
    },
    onKeyUp (e) {
      let caretPosition = this.getCaretPos()
      if (e.keyCode === 13) { // Enter key
        caretPosition++
      }
      this.body = e.target.innerText
      this.$emit('input', this.body)
      this.$nextTick(() => {
        this.setCaretPos(caretPosition)
      })
    },
    onFocus (e) {
      this.focused = true
      this.$emit('focus', e)
    },
    onBlur (e) {
      this.focused = false
      this.$emit('blur', e)
    }
  },
  render (h) {
    const placeHolder = this.showPlaceholder ? h('div', {
      attrs: {
        id: 'mplaceholder'
      },
      staticClass: 'highlights__placeholder'
    }, this.placeholder) : null

    const input = {
      ref: 'mbody',
      staticClass: 'highlights__body',
      style: {
        'text-align': 'initial',
        outline: 'currentcolor none medium',
        'user-select': 'text',
        'white-space': 'pre-wrap',
        'overflow-wrap': 'break-word',
        'caret-color': `${this.caretColor}`
      },
      attrs: {
        'aria-label': this.placeHolder,
        'aria-autocomplete': 'list',
        'aria-describedby': 'mplaceholder',
        'aria-multiline': 'true',
        contenteditable: true,
        role: 'textbox',
        spellCheck: true,
        tabindex: 0
      },
      domProps: {
        innerHTML: this.computedBody
      },
      on: {
        focus: this.onFocus,
        blur: this.onBlur,
        keyup: this.onKeyUp
      }
    }

    return h('div', {
      staticClass: 'highlights__container',
      style: {
        position: 'relative'
      }
    }, [
      h('div', {
        staticClass: 'highlights__content'
      }, [
        placeHolder,
        h('div', {
          staticClass: 'highlights__body-container'
        }, [
          h('div', input)
        ])
      ])
    ])
  }
}
