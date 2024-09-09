import type {Config} from 'tailwindcss';
import daisyui from 'daisyui';
import daisyuiTheme from 'daisyui/src/theming/themes';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiTheme['light'],
          primary: '#353845',
        },
      },
    ],
  },
};
export default config;
