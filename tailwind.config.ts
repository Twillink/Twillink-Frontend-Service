import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';
import daisyuiTheme from 'daisyui/src/theming/themes';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      tiny: '8px',
      xs: '10px',
      sm: '12px',
      base: '14px',
      xl: '16px',
      h4: '16px',
      h3: '20px',
      h2: '24px',
      h1: '32px',
      '2xl': '36px',
      '3xl': '48px',
      '4xl': '64px',
    },
    extend: {
      colors: {
        'contras-high': 'var(--contras-high)',
        'contras-med': 'var(--contras-med)',
        'contras-low': 'var(--contras-low)',
        'general-high': 'var(--general-high)',
        'general-med': 'var(--general-med)',
        'general-low': 'var(--general-low)',
        logo: 'var(--logo)',
        'primary-disable': 'var(--primary-disabled)',
      },
      height: {
        13: '52px',
      },
      padding: {
        small: '4px 8px 4px 8px',
        medium: '10px 16px 10px 16px',
      },
      borderRadius: {
        medium: '10px',
        large: '14px',
      },
      width: {
        '60px': '60px',
      },
    },
  },
  plugins: [
    plugin(function ({addBase, theme}) {
      addBase({
        h1: {
          fontSize: theme('fontSize.h1'),
          lineHeight: '48px',
        },
        h2: {
          fontSize: theme('fontSize.h2'),
          lineHeight: '40px',
        },
        h3: {
          fontSize: theme('fontSize.h3'),
          lineHeight: '32px',
        },
        h4: {
          fontSize: theme('fontSize.h4'),
          lineHeight: '28px',
        },
      });
    }),
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        skinLight: {
          primary: '#353845',
          'primary-content': '#FFFFFF',
          secondary: '#3690FB',
          'secondary-content': '#FFFFFF',
          'base-100': '#F6F7F9',
          'base-200': '#ECEDF2',
          success: '#18DC2F',
          'success-content': '#FFFFFF',
          warning: '#FA9E00',
          'warning-content': '#FFFFFF',
          error: '#F95A3A',
          'error-content': '#FFFFFF',
          '--contras-high': '#FFFFFF',
          '--contras-med': '#F6F7F9',
          '--contras-low': '#ECEDF2',
          '--general-high': '#16171D',
          '--general-med': '#888FA8',
          '--general-low': '#D6D8E1',
          '--logo': '#000000',
          '--primary-disabled': '#B2B6C7',
        },
      },
      {
        skinDark: {
          primary: '#FFFFFF',
          'primary-content': '#16171D',
          secondary: '#3690FB',
          'secondary-content': '#FFFFFF',
          'base-100': '#212431',
          'base-200': '#3B3F51',
          success: '#18DC2F',
          'success-content': '#FFFFFF',
          warning: '#FA9E00',
          'warning-content': '#FFFFFF',
          error: '#F95A3A',
          'error-content': '#FFFFFF',
          '--contras-high': '#16171D',
          '--contras-med': '#212431',
          '--contras-low': '#3B3F51',
          '--general-high': '#FFFFFF',
          '--general-med': '#B2B6C7',
          '--general-low': '#545B75',
          '--logo': '#FFFFFF',
          '--primary-disabled': '#B2B6C7',
        },
      },
      {
        light: {
          ...daisyuiTheme.light,
          primary: '#353845',
          'neutral-content': '#B2B6C7',
          'base-100': '#FFFFFF',
          'base-200': '#F6F7F9',
          'base-300': '#ECEDF2',
          'base-content': '#16171D',
        },
      },
      // {
      //   dark: {
      //     ...daisyuiTheme.dark,
      //     'neutral-content': '#D9D9D9',
      //     'base-100': '#16171D',
      //     'base-200': '#212431',
      //     'base-300': '#3B3F51',
      //     'base-content': '#FFFFFF',
      //   },
      // },
    ],
  },
};
export default config;
