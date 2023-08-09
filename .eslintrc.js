module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'], // 常にセミコロンを必要とする
    'space-before-function-paren': ['error', 'never'], // 関数名と()の間にスペースを入れない
    'no-trailing-spaces': ['error', { skipBlankLines: true }], // 空行のスペースを許容する
    'vue/max-attributes-per-line': 'off' // 1行あたり文字数制限の無効化
  }
}
