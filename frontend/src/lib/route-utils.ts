/**
 * Context-aware routing utilities for dual user/startup navigation
 * Detects whether current pathname is in startup context and adjusts routes accordingly
 */

/**
 * Get context-aware route based on current pathname
 * @param pathname - Current URL pathname from usePathname()
 * @param route - Base route (e.g., "/home", "/explore")
 * @returns Route with proper context prefix ("/startup" or empty)
 */
export function getContextRoute(pathname: string, route: string): string {
  // If already in startup context, prefix with /startup
  if (pathname.startsWith("/startup")) {
    return route.startsWith("/startup") ? route : `/startup${route}`;
  }
  // User context, remove /startup prefix if present
  return route.startsWith("/startup") ? route.slice("/startup".length) : route;
}

/**
 * Derive route context from pathname
 * @param pathname - Current URL pathname
 * @returns "/startup" if in startup context, empty string for user context
 */
export function deriveRoutePrefix(pathname: string): string {
  return pathname.startsWith("/startup") ? "/startup" : "";
}
