module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/theming',
  ],
  staticDirs: ['../public'],
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
