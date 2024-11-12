import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    letterSpacing: {
      tight: '-0.5%',
      normal: '0',
      wide: '3px',
    },
    extend: {
      backgroundImage: {
        mobile: 'url(/images/background-desktop.svg)',
        tablet: 'url(/images/background-desktop.svg)',
        desktop: 'url(/images/background-desktop.svg)',
      },
      borderRadius: {
        '4xl': '3rem',
      },
      boxShadow: {
        'play-btn': `
          inset 0 -4px 0 5px #243041,
          inset 0 -12px 0 11px #9d2df5
         `,
        'how-to-play-btn': `
          inset 0 -2px 0 3px #140E66,
          inset 0 1px 0 6px #3C74FF
         `,
        'category-btn': `
          inset 0 -4px 0 5px #243041,
          inset 0 -12px 0 11px #9d2df5
         `,
        'main-menu': `
          inset 0 -8px 0 4px #140E66,
          inset 0 6px 0 8px #2463FF
        `,
        'back-btn': `
          inset 0 -4px 0 1px #243041,
          inset 0 -6px 0 7px rgba(157, 45, 245, 0.25)
         `,
        'playable-letter': `
          inset 0 -2px 0 3px #140E66,
          inset 0 1px 0 6px #3C74FF
        `,
        'quit-btn': `
          inset 0 -2px 0 3px #140E66,
          inset 0 1px 0 6px #C642FB
        `,
      },
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        'electric-pink': '#FE71FE',
        'periwinkle-blue': '#7199FF',
      },
      fontFamily: {
        mousememoirs: ['"Mouse Memoirs"', 'sans-serif'],
        sans: [
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        body: '1.625rem',
        'heading-sm': '2rem',
        'heading-md': '3rem',
        'heading-lg': '5.5rem',
        'heading-xl': '8.5rem',
      },
      animation: {
        bounceIn: 'bounceIn 0.6s ease-out forwards',
        flipIn: 'flipIn 0.6s ease-out forwards',
        pulseHeartSlow: 'pulseHeart 1.5s ease-in-out infinite',
        pulseHeartFast: 'pulseHeart 0.8s ease-in-out infinite',
        sparkle: 'sparkle 1s ease-in-out forwards',
        sparkle2: 'sparkle2 1s ease-in-out forwards',
      },
      keyframes: {
        bounceIn: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '20%': {
            transform: 'translateY(-20px)',
          },
          '40%': {
            transform: 'translateY(10px)',
          },
          '60%': {
            transform: 'translateY(-5px)',
          },
          '80%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        flipIn: {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '50%': { transform: 'rotateY(-10deg)', opacity: '0.5' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'translate(0, 0) scale(0.5)' },
          '50%': {
            opacity: '1',
            transform: 'translate(-10px, -10px) scale(1)',
          },
        },
        sparkle2: {
          '0%, 100%': { opacity: '0', transform: 'translate(0, 0) scale(0.5)' },
          '50%': { opacity: '1', transform: 'translate(10px, 10px) scale(1)' },
        },
      },
      screens: {
        desktop: '1440px',
      },
    },
  },
} satisfies Config
