module.exports = {
  parser: "babel-eslint",
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    "plugin:security/recommended",
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    "security",
  ],
  'rules': {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "object-shorthand": "error",
    "new-cap": "error",
    "arrow-spacing": "error",
  },
};
