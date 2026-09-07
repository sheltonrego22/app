const API = process.env.REACT_APP_BACKEND_URL;

export function AlertsBanner({ alerts }) {
  if (!alerts) return null;
  const ok = alerts.smtp_configured;
  const tone = ok ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
  const message = ok
    ? `Email alerts active: the team is notified at ${alerts.alert_email} and customers receive a bilingual confirmation.`
    : `Emails to ${alerts.alert_email} and customer confirmations are not active yet: add the SMTP server credentials (SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD) and set SMTP_ENABLED=true in the backend environment.`;
  return (
    <div data-testid="alerts-status" className={`border p-3 mb-6 font-body text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${tone}`}>
      <span>{message}</span>
      <span className="flex gap-3 flex-shrink-0">
        <a data-testid="preview-contact-email" href={`${API}/api/admin/email-preview?type=contact`} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#EEEDE7]">Preview enquiry email</a>
        <a data-testid="preview-booking-email" href={`${API}/api/admin/email-preview?type=booking`} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#EEEDE7]">Preview booking email</a>
      </span>
    </div>
  );
}

export function ErrorBanner({ error, onDismiss }) {
  if (!error) return null;
  return (
    <div className="bg-red-500/10 border border-red-500/30 p-3 mb-6 flex items-center justify-between">
      <p className="font-body text-sm text-red-400">{error}</p>
      <button onClick={onDismiss} className="text-red-400 text-xs hover:underline">Dismiss</button>
    </div>
  );
}
