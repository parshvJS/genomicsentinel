import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#002147',
        teal: 'rgb(0,128,128)',
        gold: 'rgb(212,175,55)',
        bodyText: 'oklch(0.15 0.02 250)',
        mutedText: 'rgb(112,128,144)',
        pageBg: 'oklch(0.97 0.002 250)',
        sectionBg: 'oklch(0.985 0.002 247.839)',
        cardBorder: 'oklch(0.928 0.006 264.531)',
      },
      fontFamily: {
        heading: ['IBM Plex Sans', 'sans-serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 6px 28px rgba(0,0,0,0.14)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
