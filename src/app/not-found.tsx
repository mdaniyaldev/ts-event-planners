import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="pb-24">
        <PageIntro title="Page not found">
          We could not find that page. It may have moved, or the link may have a typo.
        </PageIntro>
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-4 px-5 sm:px-8">
          <Link
            href="/"
            className="btn-gold inline-flex min-h-12 items-center px-7 text-base font-semibold"
          >
            Go to the home page
          </Link>
          <Link
            href="/gallery/"
            className="inline-flex min-h-12 items-center text-base font-semibold link-gold"
          >
            See our events
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
