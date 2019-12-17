<template>
  <div id="docs">
    <div class="container">
      <h2>Documentation</h2>

      <h3>Installation</h3>

      <p>You can install via npm or yarn:</p>

      <CodeSnippet lang="shell" :code="code1" />

      <p>And then import the component in your app:</p>

      <CodeSnippet lang="js" :code="code2" />

      <h3>Usage</h3>

      <p>Let's create our first component:</p>

      <CodeSnippet lang="js" :code="code3" />

      <p>As you can see, the component accepts some props:</p>

      <table class="text-sm" style="width: 100%;">
        <thead class="mb-sm">
          <tr>
            <th>Prop</th>
            <th class="px-sm">Type</th>
            <th colspan="2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="props-name-col">
              <div class="props-name">
                extractUrlsWithoutProtocol
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                Boolean
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                As the name says, when active, the compoponet will try to match
                URLs even when a protocol (http://, https://) is not found.
                <b>Defaults to true</b>
              </div>
            </td>
          </tr>

          <tr>
            <td class="props-name-col">
              <div class="props-name">
                caretColor
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                String
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                A valid HEX color (eg. #ccc, #ff4545).
              </div>
            </td>
          </tr>

          <tr>
            <td class="props-name-col">
              <div class="props-name">
                placeholder
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                String
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                A placeholder to show when no text is entered.
              </div>
            </td>
          </tr>

          <tr>
            <td class="props-name-col">
              <div class="props-name">
                usernameClass
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                String
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                The CSS class(es) that will be added to a @username match.
              </div>
            </td>
          </tr>

          <tr>
            <td class="props-name-col">
              <div class="props-name">
                hashtagClass
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                String
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                The CSS class(es) that will be added to a #hashtag match.
              </div>
            </td>
          </tr>

          <tr>
            <td class="props-name-col">
              <div class="props-name">
                urlClass
              </div>
            </td>
            <td class="props-type-col px-sm">
              <div class="props-type">
                String
              </div>
            </td>
            <td class="props-desc-col">
              <div class="props-desc">
                The CSS class(es) that will be added to a URL match.
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        The exported component (vue-highlights) renders a text
        input that highlights all username, hashtag and URL matches. In order to
        work with this input some CSS classes should be attended, here's an
        example:
      </p>

      <CodeSnippet lang="css" :code="code4" />

      <p>With this we should get a working example.</p>

      <p>As you can see when we first imported the package, 2 functions are also
        exported: <b>autoLink</b> and <b>autoHighlight</b>.
      </p>
      <p>
        Both return a <b>String</b> value which contains our highlighted text.
        <b>autoLink</b> returns the matches found between <b>anchor</b> tags for
        links.
        <b>autoHighlight</b> returns the matches found between <b>span</b> tags for
        highlight only.
      </p>
      <h5>Examples</h5>

      <CodeSnippet lang="js" :code="code5" />

      <p>Now we can render our linked/highlighted text anywhere we like:</p>

      <CodeSnippet lang="js" :code="code6" />
    </div>
  </div>
</template>

<script>
import CodeSnippet from './components/CodeSnippet'

const code1 = `
npm install --save vue-highlights
yarn add vue-highlights
`

const code2 = `
import Vue from 'vue'
import VueHighlights, { autoLink, autoHighlight } from 'vue-highlights'

// Install component
Vue.component(VueHighlights.name, VueHighlights)
`

const code3 = `
<template>
  <vue-highlights
    v-model="text"
    :extractUrlsWithoutProtocol="true"
    caretColor="#ccc"
    placeholder="My custom placeholder..."
    usernameClass="my-username-class"
    hashtagClass="my-hash-class"
    urlClass="my-url-class"
  />
</template>

<script>
export default {
  name: 'MyComponent',
  data () {
    return {
      text: text
    }
  }
}
${'<'}/script>
`

const code4 = `
.highlights__content {
  position: relative;
}

.highlights__placeholder {
  color: #ccc;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: -1;
}

.highlights__body-container {
  border-radius: 5px;
  border: 1px solid #eaeaea;
  padding: 16px;
}

.highlights__body {
  min-height: 60px;
}

.highlights {
  color: #ff3b8e;
}
`

const code5 = `
import { autoLink, autoHighlight } from 'vue-highlights'

const text = 'my @username, my #hashtag and myurl.com'

const autoLinked = autoLink(text, {
  extractUrlsWithoutProtocol: true, // Defaults to true
  targetBlank: true, // Defauls to true, applies only in URLs
  usernameClass: 'username-class',
  usernameUrlBase: '/users/',
  hashtagClass: 'hashtag-class',
  hashtagUrlBase: '/myhashtags/',
  urlClass: 'url-class'
})

/*
autoLinked:
my <a href="/users/username" title="@username" class="username-class"
data-username="username">@username</a>, my <a href="/myhashtags/hashtag"
title="#hashtag" class="hashtag-class" data-hashtag="hashtag">#hashtag</a>
and <a href="http://myurl.com" target="_blank" class="url-class">myurl.com</a>
*/

const autoHighlighted = autoHighlight(text, {
  extractUrlsWithoutProtocol: true, // Defaults to true
  usernameClass: 'username-class',
  hashtagClass: 'hashtag-class',
  urlClass: 'url-class'
})

/*
autoHighlighted:
my <span class="username-class">@username</span>, my <span class="hashtag-class">
#hashtag</span> and <span class="url-class">myurl.com</span>
*/
`

const code6 = `
<template>
<div class="my-linked-text">
  <div v-html="text"></div>
</div>
</template>

<script>
import { autoLink } from 'vue-highlights'

const rawText = 'my @username, my #hashtag and myurl.com'
const autoLinked = autoLink(rawText) // Uses default options

export default {
  name: 'MyComponent',
  data () {
    return {
      text: autoLinked
    }
  }
}
${'<'}/script>
`

export default {
  name: 'Docs',
  components: { CodeSnippet },
  data () {
    return {
      code1,
      code2,
      code3,
      code4,
      code5,
      code6
    }
  }
}
</script>

<style lang="stylus">
@import '~@vars'

.props-name-col
  width: 30%

.props-type-col
  width: 10%

.props-name
  color: $color-brand
  font-weight: 500

.props-type
  color: $color-gray-6
  font-weight: 600

</style>
