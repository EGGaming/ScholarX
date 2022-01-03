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
            '@navigators': './src/navigators',
            '@theme': './src/theme',
            '@shared': './src/shared',
            '@public': './assets',
            RootComponent: './src/Root.tsx',
          },
        },
      ],
    ],
  };
};
