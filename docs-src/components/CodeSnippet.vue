<template>
  <div class="code-snippet box relative flex">
    <div class="language">{{ lang }}</div>
    <div class="line-numbers">
      <div class="line-number" v-for="n in lineCount" :key="n">{{ n }}</div>
    </div>
    <div class="render" v-html="result"></div>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  name: 'CodeSnippet',
  props: {
    code: String,
    lang: String
  },
  computed: {
    result () {
      const highlighted = hljs.highlight(this.lang, this.code.trim())
      return highlighted.value
    },
    lineCount () {
      const str = this.result
      let length = 0
      for (var i = 0; i < str.length; ++i) {
        if (str[i] === '\n') {
          length++
        }
      }
      return length + 1
    }
  }
}
</script>

<style lang="stylus">
@import '~@vars'
.code-snippet
  padding: 0px !important
  margin-bottom: $space-base
  font-family: 'Roboto Mono', monospace

  .line-numbers,
  .render
    padding: 12px 12px

  .line-numbers
    color: $color-gray-4
    border-radius: 2px 0 0 2px
    border-right: 1px solid $color-border

  .render
    white-space: pre

  .language
    position: absolute
    top: 0
    right: 0
    background: $color-gray-1
    color: $color-gray-9
    padding: 3px 12px
    border-radius: 0 5px 0 4px
</style>
