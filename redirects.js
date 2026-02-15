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

  // Redirect old admin "pages" collection URL to "site-pages" (collection was renamed)
  const adminPagesRedirect = {
    source: '/admin/collections/pages/:path*',
    destination: '/admin/collections/site-pages/:path*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, adminPagesRedirect]

  return redirects
}

export default redirects
