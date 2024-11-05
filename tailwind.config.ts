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
      tiny: '0.5rem',
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      xl: '1rem',
      h4: '1rem',
      h3: '1.25',
      h2: '1.5rem',
      h1: '2rem',
      '2xl': '2.25',
      '3xl': '3rem',
      '4xl': '4rem',
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
        'color-1': 'hsl(var(--color-1))',
        'color-2': 'hsl(var(--color-2))',
        'color-3': 'hsl(var(--color-3))',
        'color-4': 'hsl(var(--color-4))',
        'color-5': 'hsl(var(--color-5))',
      },
      height: {
        13: '3.25rem',
      },
      padding: {
        small: '0.25rem 0.5rem 0.25rem 0.5rem',
        medium: '0.625rem 1rem 0.625rem 1rem',
      },
      borderRadius: {
        medium: '0.625rem',
        large: '0.875rem',
      },
      animation: {
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
      },
      keyframes: {
        rainbow: {
          '0%': {'background-position': '0%'},
          '100%': {'background-position': '200%'},
        },
      },
      backgroundImage: {
        'intro-pattern': "url('/images/bg-intro.webp')",
      },
    },
  },
  plugins: [
    plugin(function ({addBase, theme}) {
      addBase({
        h1: {
          fontSize: theme('fontSize.h1'),
          lineHeight: '3rem',
        },
        h2: {
          fontSize: theme('fontSize.h2'),
          lineHeight: '2.5rem',
        },
        h3: {
          fontSize: theme('fontSize.h3'),
          lineHeight: '2rem',
        },
        h4: {
          fontSize: theme('fontSize.h4'),
          lineHeight: '1.75rem',
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
