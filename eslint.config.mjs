import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    // These UI components intentionally use plain <img> for highly dynamic image sources,
    // fallback/error behavior, and lightweight decorative assets.
    files: [
      'src/Footer/FooterClient.tsx',
      'src/blocks/HeroMarketing/Component.tsx',
      'src/blocks/ServicesGrid/Component.tsx',
      'src/components/AdminLogo/index.tsx',
      'src/components/AdminLogoClient/index.tsx',
      'src/components/BeforeLogin/index.tsx',
      'src/components/Logo/Logo.tsx',
      'src/components/MegaMenu/index.tsx',
      'src/components/RichText/index.tsx',
      'src/components/about*.tsx',
      'src/components/feature*.tsx',
      'src/components/skills*.tsx',
      'src/components/ui/logo-carousel.tsx',
      'src/components/ui/resilient-image.tsx',
      'src/heros/HeroLogoMarquee.tsx',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  {
    ignores: ['.next/', '*.js', 'scripts/', 'drizzle/', 'patches/', 'data/'],
  },
]

export default eslintConfig
