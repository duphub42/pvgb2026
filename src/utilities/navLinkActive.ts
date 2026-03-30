/** Ob die aktuelle Route zu dieser Nav-URL passt (exakt oder Unterpfad). */
export function isNavLinkActive(pathname: string, itemUrl: string): boolean {
  const path = itemUrl.startsWith('http') ? new URL(itemUrl).pathname : itemUrl
  if (pathname === path) return true
  if (path !== '/' && pathname.startsWith(path + '/')) return true
  return false
}
