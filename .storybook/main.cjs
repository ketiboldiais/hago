module.exports = {
  stories: [
    '../stories/**/Overview.stories.mdx',
    '../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/theming',
  ],
  staticDirs: ['../stories/assets'],
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
