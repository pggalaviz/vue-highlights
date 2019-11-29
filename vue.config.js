const path = require('path')

module.exports = {
  lintOnSave: false,
  outputDir: './docs',
  publicPath: './',

  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, 'docs-src/main.js')
    },
    resolve: {
      extensions: [ '.styl' ],
      alias: {
        '@': path.resolve(__dirname, 'docs-src'),
        '@vars': path.resolve(__dirname, 'docs-src/styles/variables.styl')
      }
    }
  },

  css: undefined,

  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(path.resolve(__dirname, 'docs-src'))

    config.module
      .rule('vue')
      .include
      .add(path.resolve(__dirname, 'docs-src'))

    config.module
      .rule('styl')
      .include
      .add(path.resolve(__dirname, 'docs-src'))
  }
}
