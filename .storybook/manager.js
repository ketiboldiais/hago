import { addons } from '@storybook/addons';
import LightTheme from './LightTheme';

addons.setConfig({
  theme: LightTheme,
  sidebar: {
    showRoots: false,
  },
});
