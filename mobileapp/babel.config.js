module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ... other configs, if any
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          'src': './src',
          'assets': './assets',
          'components': './src/components',
          'screens': './src/screens',
          'utils': './src/utils',
          'service': './src/service',
          'appConfig': './appConfig',
          'globalStyle': './src/globalStyle',
        },
      },
    ],
    // ... other configs, if any
  ],
};
