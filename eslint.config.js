import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  stylistic: true,
  rules: {
    'n/prefer-global/process': 'off',
    'no-undef': 'error',
    'no-fallthrough': 'off',
    'vue/block-order': 'off',
  },
  languageOptions: {
    globals: {
      h: 'readonly',
      provide: 'readonly',
      inject: 'readonly',
      markRaw: 'readonly',
      defineAsyncComponent: 'readonly',
      nextTick: 'readonly',
      useRoute: 'readonly',
      useRouter: 'readonly',
      Message: 'readonly',
      Modal: 'readonly',
      NProgress: 'readonly',
    },
  },
})
