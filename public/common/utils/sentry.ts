import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'


if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.FRONTEND_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: process.env.FRONTEND_SENTRY_TRACE_SAMPLE_RATE,
    environment: process.env.NODE_ENV,
  })
}
