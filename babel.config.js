module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'src': './src',
            'assets': './src/Assets',
            'components': './src/Components',
            "hooks": "./src/Hooks"
          },
        },
      ],
    ],
  };
};
