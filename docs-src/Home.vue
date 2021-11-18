<template>
  <div id="home" class="text-center">
    <img id="logo" alt="Vue logo" src="./assets/logo.png">

    <h1>vue-highlights</h1>

    <div id="description" class="mb-md">
      <b>Easy mention, hashtag and URL highlight for Vue 2.x</b>
    </div>

    <div class="flex center mb-md text-sm">
      <div id="install" class="pa-md font-mono content-container">
        npm install --save vue-highlights
      </div>
    </div>

    <div class="flex center text-md">
      <vue-highlights
        v-model="text"
        class="content-container"
        :placeholder="placeholder"
        :caretColor="caretColor"
        :extractUrlsWithoutProtocol="options.extractUrlsWithoutProtocol"
        :mentionsWithDots="options.mentionsWithDots"
      />
    </div>

    <div class="flex center my-md">
      <div id="options" class="content-container">
        <h4>Options (props)</h4>
        <div class="flex center">
          <label for="ep" class="cursor-pointer">
            <input id="ep" type="checkbox" v-model="options.extractUrlsWithoutProtocol">
            extractUrlsWithoutProtocol
          </label>
          <label for="tb" class="mx-lg cursor-pointer">
            <input id="tb" type="checkbox" v-model="options.targetBlank">
            targetBlank
          </label>
          <label for="md" class="cursor-pointer">
            <input id="md" type="checkbox" v-model="options.mentionsWithDots">
            mentionsWithDots
          </label>
        </div>

        <div class="flex center mt-sm text-left relative">
          <div class="mr-md col-50">
            <label for="uc" class="label cursor-pointer">
              usernameClass
            </label>
            <input id="uc" type="text" class="input" v-model="options.usernameClass">
          </div>
          <div class="col-50">
            <label for="ut" class="label cursor-pointer">
              usernameUrlBase
            </label>
            <div>
              <input id="ut" type="text" class="input" v-model="options.usernameUrlBase">
            </div>
          </div>
        </div>

        <div class="flex center mt-sm text-left">
          <div class="mr-md col-50">
            <label for="hc" class="label cursor-pointer">
              hashtagClass
            </label>
            <div>
              <input id="hc" type="text" class="input" v-model="options.hashtagClass">
            </div>
          </div>
          <div class="col-50">
            <label for="ht" class="label cursor-pointer">
              hashtagUrlBase
            </label>
            <div>
              <input id="ht" type="text" class="input" v-model="options.hashtagUrlBase">
            </div>
          </div>
        </div>

        <div class="flex center mt-sm text-left">
          <div class="mr-md col-50">
            <label for="urc" class="label cursor-pointer">
              urlClass
            </label>
            <div>
              <input id="urc" type="text" class="input" v-model="options.urlClass">
            </div>
          </div>
          <div class="col-50">
            <label for="cc" class="label cursor-pointer">
              caretColor
            </label>
            <div>
              <input id="cc" type="text" class="input" v-model="caretColor">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column center vcenter">
      <div class="content-container">
        <div class="mb-md">
          <h4>HTML with links:</h4>
          <div class="text-md" v-html="$autoLink(text, options)"></div>
        </div>

        <div class="mb-md">
          <h4>Text with links:</h4>
          <div class="text-center">
            <div class=""> {{ $autoLink(text, options) }}</div>
          </div>
        </div>

        <div class="mb-md">
          <h4>Model text:</h4>
          <div class=""> {{ text }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      placeholder: 'Write something here, include @mentions, #hashtags and URLs...',
      text: 'Hi there! @pggalaviz #vue pggalaviz.com',
      caretColor: '#ff3b8e',
      options: {
        targetBlank: true,
        extractUrlsWithoutProtocol: true,
        mentionsWithDots: false,
        usernameClass: 'highlights username',
        usernameUrlBase: '#/',
        hashtagClass: 'highlights hashtag',
        hashtagUrlBase: '#/hashtag/',
        urlClass: 'highlights url'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '~@vars'

#logo
  width: 50px
  height: auto

#install
  background-color: lighten($color-border, 60%)
  line-height: 1

</style>
