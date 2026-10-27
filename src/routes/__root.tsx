import type { ErrorComponentProps } from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
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
    <Link to="/" className="group flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="Guardian logo"
        width={34}
        height={34}
        className="size-[34px] rounded-[9px] transition-transform duration-300 group-hover:-translate-y-px"
      />

      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
          Guardian
        </span>
        <span className="text-[12px] font-medium text-ink-faint">PK</span>
      </span>
    </Link>
  );
}

const navLinks = [
  { label: "How it works", to: "/", hash: "how" },
  { label: "Features", to: "/", hash: "features" },
  { label: "Privacy", to: "/", hash: "privacy" },
  { label: "FAQ", to: "/", hash: "faq" },
] as const;

function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-line backdrop-blur-xl"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center">
          <Wordmark />
        </div>

        <div className="flex items-center justify-center">
          <div className="hidden items-center gap-7 text-[14.5px] text-ink-muted lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                className="group relative py-1 transition-colors hover:text-ink"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-self-end gap-3">
          <ThemeToggle />

          <Link to="/download" className="btn-primary hidden sm:inline-flex">
            Get Guardian
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t border-line px-5 py-4 lg:hidden"
          style={{ background: "var(--panel)" }}
        >
          <div className="flex flex-col gap-4 text-[15px] text-ink-muted">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="hover:text-ink"
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/download"
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 self-start"
            >
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
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xs">
            <Wordmark />

            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-muted">
              Thoughtful tools for a more intentional digital life.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-ink-muted"
          >
            <Link to="/" hash="features" className="transition-colors hover:text-ink">
              Features
            </Link>
            <Link to="/" hash="privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link to="/" hash="faq" className="transition-colors hover:text-ink">
              FAQ
            </Link>
            <Link to="/download" className="transition-colors hover:text-ink">
              Download
            </Link>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-line pt-5 text-[12.5px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Questions?{" "}
            <a
              href="mailto:support@guardian.pk"
              className="text-ink transition-colors hover:text-accent"
            >
              support@guardian.pk
            </a>
          </p>

          <p>Support in English or Urdu.</p>
        </div>
      </div>
    </footer>
  );
}

function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

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

        <h2 className="mt-4 text-xl font-semibold text-ink">
          Page not found
        </h2>

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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          This page didn't load
        </h1>

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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      {
        rel: "icon",
        href: "/favicon.png",
        type: "image/png",
      },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;650;700&family=JetBrains+Mono:wght@400;500&display=swap",
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

      <Analytics />
    </QueryClientProvider>
  );
}