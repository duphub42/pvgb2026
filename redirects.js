const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Redirect old admin collection URLs after slug renames (pages→site-pages, posts→blog-posts)
  const adminPagesRedirect = {
    source: '/admin/collections/pages/:path*',
    destination: '/admin/collections/site-pages/:path*',
    permanent: true,
  }
  const adminPostsRedirect = {
    source: '/admin/collections/posts/:path*',
    destination: '/admin/collections/blog-posts/:path*',
    permanent: true,
  }

  const legacyRedirects = [
    {
      source: '/angebot',
      destination: '/leistungen',
      permanent: true,
    },
    {
      source: '/angebote',
      destination: '/leistungen',
      permanent: true,
    },
    {
      source: '/leistungen-old',
      destination: '/leistungen',
      permanent: true,
    },
    {
      source: '/portfolio-marken',
      destination: '/portfolio-branding',
      permanent: true,
    },
    {
      source: '/kontakt-2',
      destination: '/kontakt',
      permanent: true,
    },
    {
      source: '/author/:path*',
      destination: '/profil',
      permanent: true,
    },
    {
      source: '/category/:path*',
      destination: '/posts',
      permanent: true,
    },
    {
      source: '/tag/:path*',
      destination: '/posts',
      permanent: true,
    },
  ]

  const redirects = [
    internetExplorerRedirect,
    adminPagesRedirect,
    adminPostsRedirect,
    ...legacyRedirects,
  ]

  return redirects
}

export default redirects
