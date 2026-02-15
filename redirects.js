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

  const redirects = [internetExplorerRedirect, adminPagesRedirect, adminPostsRedirect]

  return redirects
}

export default redirects
