import reactHooks from '/app/frontend/node_modules/eslint-plugin-react-hooks/index.js';
export default [{
  files: ['**/*.js'],
  languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
  plugins: { 'react-hooks': reactHooks },
  rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' },
}];
