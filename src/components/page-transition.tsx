import { ViewTransition } from "react";
import { PageWrap } from "@/components/page-wrap";

/**
 * Wraps the content of every page so route changes animate (see "Page changes" in globals.css):
 * the old page fades out and the new one opens from the middle, like stage curtains parting.
 * On a hard load `.page-wrap` plays a plain fade and rise instead (PageWrap decides which).
 * Layouts persist across navigations, so this must wrap each page, not the layout.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <PageWrap>{children}</PageWrap>
    </ViewTransition>
  );
}
