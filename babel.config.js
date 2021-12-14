module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './',
          alias: {
            '@screens': './src/screens',
            '@utilities': './src/utilities',
            '@context': './src/context',
            '@components': './src/components',
            RootComponent: './src/Root.tsx',
          },
        },
      ],
    ],
  };
};
