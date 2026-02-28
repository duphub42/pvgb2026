/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      animation: {
        'hero-box-slide-up':
          'hero-box-slide-up 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        marquee: 'marquee 30s linear infinite',
        'halo-float': 'hero-css-halo-float 18s ease-in-out infinite alternate',
      },
      keyframes: {
        'hero-box-slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': {
            transform: 'translateX(calc(-50% * var(--marquee-direction, 1)))',
          },
        },
        'hero-css-halo-float': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-40px) scale(1.05)' },
          '100%': { transform: 'translateY(20px) scale(0.95)' },
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 4px 16px -4px rgba(0, 0, 0, 0.06)',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
