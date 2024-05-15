module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src/',
        },
        extensions: [
          '.ios.ts',
          '.ios.js',
          '.ios.tsx',
          '.android.ts',
          '.android.js',
          '.android.tsx',
          '.js',
          '.ts',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};
