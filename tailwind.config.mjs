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
              '--tw-prose-body': 'var(--foreground)',
              '--tw-prose-headings': 'var(--foreground)',
              p: {
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-size)',
                lineHeight: 'var(--type-body-line-height)',
                letterSpacing: 'var(--type-body-letter-spacing)',
              },
              h1: {
                fontFamily: 'var(--font-heading)',
                fontSize:
                  'clamp(var(--type-display-size-min), var(--type-display-size-fluid), var(--type-display-size-max))',
                lineHeight: 'var(--type-display-line-height)',
                letterSpacing: 'var(--type-display-letter-spacing)',
                fontWeight: 'var(--type-weight-semibold)',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--type-heading-lg-size)',
                lineHeight: 'var(--type-heading-lg-line-height)',
                letterSpacing: 'var(--type-heading-lg-letter-spacing)',
                fontWeight: 'var(--type-weight-semibold)',
              },
              h3: {
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--type-heading-md-size)',
                lineHeight: 'var(--type-heading-md-line-height)',
                letterSpacing: 'var(--type-heading-md-letter-spacing)',
                fontWeight: 'var(--type-weight-semibold)',
              },
              h4: {
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--type-heading-sm-size)',
                lineHeight: 'var(--type-heading-sm-line-height)',
                letterSpacing: 'var(--type-heading-sm-letter-spacing)',
                fontWeight: 'var(--type-weight-medium)',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
