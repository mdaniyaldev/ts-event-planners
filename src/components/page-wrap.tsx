"use client";

import { useLayoutEffect } from "react";

// The path the browser loaded; any other path means a client-side navigation happened.
const loadedPath = typeof window === "undefined" ? null : window.location.pathname;

/**
 * The element the page animations run on. Only a hard load (first visit, refresh) should play the
 * CSS `page-load` fade: after the first client navigation the view transition is the entrance, so
 * this marks <html data-navigated> before paint and the CSS rule stops matching. The mark stays
 * for the rest of the session; a refresh clears it.
 */
export function PageWrap({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    if (window.location.pathname !== loadedPath) document.documentElement.dataset.navigated = "";
  }, []);

  return <div className="page-wrap">{children}</div>;
}
