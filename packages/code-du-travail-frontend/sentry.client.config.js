// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_PUBLIC_DSN || "",
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENV || process.env.SENTRY_ENV || "dev",
  tracesSampleRate: 1.0,
});
