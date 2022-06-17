// .storybook/YourTheme.js

import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: 'white',
  colorSecondary: 'tomato',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: 'grey',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'system-ui',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'lightgrey',
  barSelectedColor: 'white',
  barBg: 'slategray',

  // Form colors
  inputBg: 'white',
  inputBorder: 'grey',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Hago',
  // brandUrl: 'https://example.com',
  // brandImage: 'https://res.cloudinary.com/sublimis/image/upload/c_thumb,w_200,g_face/v1655438049/hago/hago_banner_b4w7vt.svg',
  brandTarget: '_self',
});
