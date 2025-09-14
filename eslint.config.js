import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'indent': ['error', 2],
      'linebreak-style': 'off', 
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off'
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly', 
        Math: 'readonly'   
      }
    }
  }
];