const isDev = process.env.NODE_ENV === 'development';

export function logError(context, err) {
  if (isDev) {
    console.error(`[${context}]`, err);
  }
  // In production, errors are silently captured.
  // Replace with Sentry/LogRocket when ready:
  // Sentry.captureException(err, { extra: { context } });
}
