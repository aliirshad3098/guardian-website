import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeToggle } from "../components/ThemeToggle";

function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="font-display text-[21px] font-semibold tracking-tight text-ink">
        Guardian
      </span>
      <span className="rounded-md bg-violet px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-widest text-white">
        PK
      </span>
    </Link>
  );
}

const navLinks = [
  { label: "How it works", to: "/", hash: "how" },
  { label: "Features", to: "/features" },
  { label: "Privacy", to: "/privacy" },
  { label: "FAQ", to: "/faq" },
] as const;

function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-line backdrop-blur-xl"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center gap-10">
          <Wordmark />
          <div className="hidden items-center gap-7 text-[14.5px] text-ink-muted lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                className="group relative py-1 transition-colors hover:text-ink"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-cyan transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle />
          <Link to="/download" className="btn-primary hidden sm:inline-flex">
            Get Guardian
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="size-4">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line px-5 py-4 lg:hidden" style={{ background: "var(--panel)" }}>
          <div className="flex flex-col gap-4 text-[15px] text-ink-muted">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/download" onClick={() => setOpen(false)} className="btn-primary mt-1 self-start">
              Get Guardian
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line py-11">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Wordmark />
          <div className="flex flex-wrap gap-6 text-[13.5px] text-ink-muted">
            <Link to="/features" className="hover:text-ink">
              Features
            </Link>
            <Link to="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link to="/faq" className="hover:text-ink">
              FAQ
            </Link>
            <Link to="/download" className="hover:text-ink">
              Download
            </Link>
          </div>
          <p className="font-mono text-[12.5px] text-ink-faint">Made in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * PageTransition — cross-fades between routes. Keying the wrapper div on
 * pathname forces React to remount it on navigation, which restarts the
 * `page-enter` CSS animation (defined in styles.css) — a fade+small-lift,
 * same easing family as Reveal so route changes feel like part of the same
 * motion language rather than a separate effect. No exit animation (that
 * needs a transition library to hold the old page during unmount); the
 * entrance alone is what reads as an intentional transition rather than a
 * hard cut, and it's free — no extra dependency.
 */
function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink-muted">
          This page doesn't exist or has moved.
        </p>
        <Link to="/" className="btn-primary mt-6">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-ink">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Something went wrong. Try refreshing, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const themeScript = `(function(){try{var s=localStorage.getItem('guardian-theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,440;9..144,560;9..144,660&family=Sora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-bg text-ink">
        <SiteNav />
        <PageTransition>
          <Outlet />
        </PageTransition>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}