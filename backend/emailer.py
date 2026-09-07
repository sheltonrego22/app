import logging
import os
import smtplib
import ssl
from email.message import EmailMessage

log = logging.getLogger("egmg.email")


def _clean(value: str) -> str:
    return str(value or "").replace("\r", " ").replace("\n", " ").strip()


def smtp_configured() -> bool:
    enabled = os.environ.get("SMTP_ENABLED", "false").strip().lower() in {"1", "true", "yes", "on"}
    values = [os.environ.get(k, "").strip() for k in ("SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_FROM", "ALERT_EMAIL")]
    return enabled and all(values) and not any(v.startswith("REPLACE_WITH") for v in values)


def send_alert(subject: str, text: str, reply_to: str = "") -> bool:
    """Best-effort sync SMTP send for BackgroundTasks; never raises."""
    if not smtp_configured():
        log.info("SMTP not configured; alert skipped: %s", _clean(subject))
        return False
    try:
        host = os.environ["SMTP_HOST"].strip()
        port = int(os.environ.get("SMTP_PORT", "587"))
        security = os.environ.get("SMTP_SECURITY", "starttls").strip().lower()
        username = os.environ["SMTP_USERNAME"].strip()
        password = os.environ["SMTP_PASSWORD"]
        sender = os.environ["SMTP_FROM"].strip()
        recipient = os.environ["ALERT_EMAIL"].strip()
        timeout = float(os.environ.get("SMTP_TIMEOUT_SECONDS", "10"))

        msg = EmailMessage()
        msg["Subject"] = _clean(subject)
        msg["From"] = sender
        msg["To"] = recipient
        if reply_to:
            msg["Reply-To"] = _clean(reply_to)
        msg.set_content(text)

        ctx = ssl.create_default_context()
        if security == "ssl":
            with smtplib.SMTP_SSL(host, port, timeout=timeout, context=ctx) as smtp:
                smtp.login(username, password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(host, port, timeout=timeout) as smtp:
                smtp.ehlo()
                smtp.starttls(context=ctx)
                smtp.ehlo()
                smtp.login(username, password)
                smtp.send_message(msg)
        log.info("Alert email sent: %s", _clean(subject))
        return True
    except Exception as exc:
        log.error("Alert email failed (%s): %s", type(exc).__name__, _clean(subject))
        return False


def contact_alert(c: dict) -> tuple[str, str]:
    subject = f"New website enquiry: {c.get('enquiry_type', 'General')} from {c.get('full_name', '')}"
    text = (
        "A new enquiry was submitted on the Eurogulf Mobility Group website.\n\n"
        f"Name: {c.get('full_name', '')}\n"
        f"Company: {c.get('company') or '-'}\n"
        f"Email: {c.get('email', '')}\n"
        f"Phone: {c.get('phone', '')}\n"
        f"Enquiry type: {c.get('enquiry_type', '')}\n"
        f"Submitted: {c.get('created_at', '')}\n\n"
        f"Message:\n{c.get('message', '')}\n\n"
        "Manage this enquiry in the admin dashboard under Enquiries."
    )
    return subject, text


def booking_alert(b: dict) -> tuple[str, str]:
    subject = f"New chauffeur booking {b.get('reference', '')}: {b.get('name', '')}"
    text = (
        "A new chauffeur booking was submitted on the Eurogulf Mobility Group website.\n\n"
        f"Reference: {b.get('reference', '')}\n"
        f"Customer: {b.get('name', '')}\n"
        f"Email: {b.get('email', '')}\n"
        f"Phone: {b.get('phone', '')}\n"
        f"Date / time: {b.get('date', '')} at {b.get('time', '')}\n"
        f"Duration: {b.get('duration', '')}\n"
        f"Passengers: {b.get('passengers', '')}\n"
        f"Vehicle: {b.get('vehicle', '')}\n"
        f"Pickup: {b.get('pickup_location', '')} ({b.get('pickup_type', '')})\n"
        f"Drop-off: {b.get('dropoff_location', '')} ({b.get('dropoff_type', '')})\n"
        f"Price: AED {b.get('price', '')}\n"
        f"Notes: {b.get('notes') or '-'}\n\n"
        "Manage this booking in the admin dashboard under Bookings."
    )
    return subject, text
