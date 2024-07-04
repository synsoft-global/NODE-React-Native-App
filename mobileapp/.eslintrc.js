module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  rules: {
    // Add or override rules here
    'no-console': ['error', {allow: ['warn', 'log']}], // Disallow the use of console.log, but allow warn and error
    'comma-dangle': ['error', 'always-multiline'], // Require trailing commas in multiline object literals and arrays
    'no-unused-vars': 'error', // Disallow unused variables
    'no-undef': 'error', // Disallow the use of undeclared variables
    quotes: ['error', 'single'], // Enforce the use of single quotes
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': 'off', // Disable the linebreak-style rule
    // Add more rules as needed
  },
};
