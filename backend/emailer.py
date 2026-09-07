import html
import logging
import os
import re
import smtplib
import ssl
from email.message import EmailMessage

log = logging.getLogger("egmg.email")
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PHONE = "800 364"
WHATSAPP = "https://wa.me/971800364"


def _clean(value) -> str:
    return str(value or "").replace("\r", " ").replace("\n", " ").strip()


def _h(value) -> str:
    return html.escape(str(value if value is not None else ""))


def smtp_configured() -> bool:
    enabled = os.environ.get("SMTP_ENABLED", "false").strip().lower() in {"1", "true", "yes", "on"}
    values = [os.environ.get(k, "").strip() for k in ("SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_FROM", "ALERT_EMAIL")]
    return enabled and all(values) and not any(v.startswith("REPLACE_WITH") for v in values)


def send_email(to: str, subject: str, text: str, html_body: str = "", reply_to: str = "") -> bool:
    """Best-effort sync SMTP send for BackgroundTasks; never raises."""
    to = _clean(to)
    if not EMAIL_RE.match(to):
        log.warning("Invalid recipient; email skipped: %s", _clean(subject))
        return False
    if not smtp_configured():
        log.info("SMTP not configured; email skipped [to=%s]: %s", to, _clean(subject))
        return False
    try:
        host = os.environ["SMTP_HOST"].strip()
        port = int(os.environ.get("SMTP_PORT", "587"))
        security = os.environ.get("SMTP_SECURITY", "starttls").strip().lower()
        username = os.environ["SMTP_USERNAME"].strip()
        password = os.environ["SMTP_PASSWORD"]
        sender = os.environ["SMTP_FROM"].strip()
        timeout = float(os.environ.get("SMTP_TIMEOUT_SECONDS", "10"))

        msg = EmailMessage()
        msg["Subject"] = _clean(subject)
        msg["From"] = f"Eurogulf Mobility Group <{sender}>"
        msg["To"] = to
        if reply_to and EMAIL_RE.match(_clean(reply_to)):
            msg["Reply-To"] = _clean(reply_to)
        msg.set_content(text)
        if html_body:
            msg.add_alternative(html_body, subtype="html")

        ctx = ssl.create_default_context()
        if security == "ssl":
            with smtplib.SMTP_SSL(host, port, timeout=timeout, context=ctx) as smtp:
                smtp.login(username, password)
                smtp.send_message(msg, from_addr=sender, to_addrs=[to])
        else:
            with smtplib.SMTP(host, port, timeout=timeout) as smtp:
                smtp.ehlo()
                smtp.starttls(context=ctx)
                smtp.ehlo()
                smtp.login(username, password)
                smtp.send_message(msg, from_addr=sender, to_addrs=[to])
        log.info("Email sent [to=%s]: %s", to, _clean(subject))
        return True
    except Exception as exc:
        log.error("Email failed (%s) [to=%s]: %s", type(exc).__name__, to, _clean(subject))
        return False


def send_alert(subject: str, text: str, reply_to: str = "") -> bool:
    return send_email(os.environ.get("ALERT_EMAIL", ""), subject, text, "", reply_to)


# ══════════════════ TEAM ALERTS ══════════════════

def contact_alert(c: dict) -> tuple[str, str]:
    subject = f"New website enquiry: {c.get('enquiry_type', 'General')} from {c.get('full_name', '')}"
    text = (
        "A new enquiry was submitted on the Eurogulf Mobility Group website.\n\n"
        f"Name: {c.get('full_name', '')}\nCompany: {c.get('company') or '-'}\nEmail: {c.get('email', '')}\n"
        f"Phone: {c.get('phone', '')}\nEnquiry type: {c.get('enquiry_type', '')}\nSubmitted: {c.get('created_at', '')}\n\n"
        f"Message:\n{c.get('message', '')}\n\nManage this enquiry in the admin dashboard under Enquiries."
    )
    return subject, text


def booking_alert(b: dict) -> tuple[str, str]:
    subject = f"New chauffeur booking {b.get('reference', '')}: {b.get('name', '')}"
    text = (
        "A new chauffeur booking was submitted on the Eurogulf Mobility Group website.\n\n"
        f"Reference: {b.get('reference', '')}\nCustomer: {b.get('name', '')}\nEmail: {b.get('email', '')}\nPhone: {b.get('phone', '')}\n"
        f"Date / time: {b.get('date', '')} at {b.get('time', '')}\nDuration: {b.get('duration', '')}\nPassengers: {b.get('passengers', '')}\n"
        f"Vehicle: {b.get('vehicle', '')}\nPickup: {b.get('pickup_location', '')} ({b.get('pickup_type', '')})\n"
        f"Drop-off: {b.get('dropoff_location', '')} ({b.get('dropoff_type', '')})\nPrice: AED {b.get('price', '')}\nNotes: {b.get('notes') or '-'}\n\n"
        "Manage this booking in the admin dashboard under Bookings."
    )
    return subject, text


# ══════════════════ CUSTOMER CONFIRMATIONS (bilingual) ══════════════════

def application_alert(c: dict) -> tuple[str, str]:
    subject = f"New job application: {c.get('role', '')} from {c.get('full_name', '')}"
    text = (
        "A new job application was submitted on the Eurogulf Mobility Group careers page.\n\n"
        f"Role: {c.get('role', '')}\nName: {c.get('full_name', '')}\nEmail: {c.get('email', '')}\nPhone: {c.get('phone', '')}\n"
        f"LinkedIn: {c.get('linkedin_url') or '-'}\nSubmitted: {c.get('created_at', '')}\n\n"
        f"Cover note:\n{c.get('message', '')}\n\n"
        f"CV: log in to the admin dashboard (Enquiries tab) and open the CV link {c.get('attachment_url', '')}."
    )
    return subject, text


def application_confirmation(c: dict) -> tuple[str, str, str]:
    name, role = c.get("full_name", ""), c.get("role", "")
    en_rows = [("Role", role), ("Email", c.get("email", "")), ("Phone", c.get("phone", ""))]
    ar_rows = [("الوظيفة", role), ("البريد الإلكتروني", c.get("email", "")), ("الهاتف", c.get("phone", ""))]
    subject = f"Application received: {role} | تم استلام طلبك - Eurogulf Mobility Group"
    en_intro = f"Dear {name}, thank you for applying to Eurogulf Mobility Group. We have received your application and CV for the {role} position. Our recruitment team reviews every application and will contact shortlisted candidates directly."
    ar_intro = f"عزيزنا {name}، شكراً لتقدمك إلى مجموعة يوروجلف للتنقل. استلمنا طلبك وسيرتك الذاتية لوظيفة {role}. يراجع فريق التوظيف لدينا كل طلب وسيتواصل مباشرة مع المرشحين المختارين."
    en_note = "Questions about your application? Write to careers@eurogulf.ae."
    ar_note = "لديك استفسار حول طلبك؟ راسلنا على careers@eurogulf.ae."
    text = (
        f"{en_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in en_rows) + f"\n\n{en_note}\n\n"
        f"{ar_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in ar_rows) + f"\n\n{ar_note}\n\nEurogulf Mobility Group · WE MOVE YOU!"
    )
    html_body = _layout({"en_heading": "Thank you for your application", "en_intro": en_intro, "en_rows": en_rows, "en_note": en_note,
                         "ar_heading": "شكراً لتقديم طلبك", "ar_intro": ar_intro, "ar_rows": ar_rows, "ar_note": ar_note})
    return subject, text, html_body

def _rows(pairs) -> str:
    return "".join(
        f'<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:42%">{_h(k)}</td>'
        f'<td style="padding:8px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-size:13px;font-weight:600">{_h(v)}</td></tr>'
        for k, v in pairs
    )


def _layout(spec: dict) -> str:
    """spec keys: en_heading, en_intro, en_rows, en_note, ar_heading, ar_intro, ar_rows, ar_note."""
    en_heading, en_intro, en_rows, en_note = spec["en_heading"], spec["en_intro"], spec["en_rows"], spec["en_note"]
    ar_heading, ar_intro, ar_rows, ar_note = spec["ar_heading"], spec["ar_intro"], spec["ar_rows"], spec["ar_note"]
    return f"""<!doctype html><html><body style="margin:0;padding:0;background:#f5f2ec;font-family:Roboto,Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f2ec;padding:24px 0"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff">
  <tr><td style="background:#000000;padding:28px 32px;border-bottom:4px solid #EE5A01">
    <div style="color:#EE5A01;font-size:11px;letter-spacing:3px;font-weight:700">WE MOVE YOU!</div>
    <div style="color:#ffffff;font-size:22px;font-weight:900;letter-spacing:1px;margin-top:6px">EUROGULF MOBILITY GROUP</div>
    <div style="color:#999999;font-size:12px;margin-top:4px;font-family:'Segoe UI',Tahoma,'Noto Naskh Arabic','Geeza Pro',Arial,sans-serif">مجموعة يوروجلف للتنقل</div>
  </td></tr>
  <tr><td style="padding:32px 32px 8px 32px" dir="ltr">
    <h1 style="margin:0 0 12px 0;font-size:20px;color:#1a1a1a">{_h(en_heading)}</h1>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#444">{_h(en_intro)}</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">{_rows(en_rows)}</table>
    <p style="margin:20px 0 0 0;font-size:13px;line-height:1.6;color:#444">{_h(en_note)}</p>
  </td></tr>
  <tr><td style="padding:0 32px"><hr style="border:0;border-top:2px solid #EE5A01;margin:24px 0"></td></tr>
  <tr><td style="padding:8px 32px 32px 32px;text-align:right;font-family:'Segoe UI',Tahoma,'Noto Naskh Arabic','Geeza Pro',Arial,sans-serif" dir="rtl">
    <h1 style="margin:0 0 12px 0;font-size:20px;color:#1a1a1a">{_h(ar_heading)}</h1>
    <p style="margin:0 0 20px 0;font-size:14px;line-height:1.8;color:#444">{_h(ar_intro)}</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">{_rows(ar_rows)}</table>
    <p style="margin:20px 0 0 0;font-size:13px;line-height:1.8;color:#444">{_h(ar_note)}</p>
  </td></tr>
  <tr><td style="background:#000000;padding:24px 32px;text-align:center">
    <a href="tel:800364" style="color:#EE5A01;font-weight:700;text-decoration:none;font-size:14px">{PHONE}</a>
    <span style="color:#666;padding:0 10px">|</span>
    <a href="{WHATSAPP}" style="color:#EE5A01;font-weight:700;text-decoration:none;font-size:14px">WhatsApp</a>
    <span style="color:#666;padding:0 10px">|</span>
    <a href="mailto:wemoveyou@eurogulf.ae" style="color:#EE5A01;font-weight:700;text-decoration:none;font-size:14px">wemoveyou@eurogulf.ae</a>
    <div style="color:#666;font-size:11px;margin-top:14px">Eurogulf Mobility Group · Al Quoz Industrial 3, Dubai, UAE · Since 1976</div>
    <div style="color:#666;font-size:11px;margin-top:4px">مجموعة يوروجلف للتنقل · القوز الصناعية ٣، دبي، الإمارات</div>
  </td></tr>
</table></td></tr></table></body></html>"""


def contact_confirmation(c: dict) -> tuple[str, str, str]:
    name = c.get("full_name", "")
    en_rows = [("Enquiry type", c.get("enquiry_type", "")), ("Company", c.get("company") or "-"), ("Phone", c.get("phone", "")), ("Your message", c.get("message", ""))]
    ar_rows = [("نوع الاستفسار", c.get("enquiry_type", "")), ("الشركة", c.get("company") or "-"), ("الهاتف", c.get("phone", "")), ("رسالتك", c.get("message", ""))]
    subject = "We received your enquiry | استلمنا استفسارك - Eurogulf Mobility Group"
    en_intro = f"Dear {name}, thank you for contacting Eurogulf Mobility Group. Your enquiry has been received and a member of our team will respond within one business day."
    ar_intro = f"عزيزنا {name}، شكراً لتواصلك مع مجموعة يوروجلف للتنقل. لقد استلمنا استفسارك وسيتواصل معك أحد أعضاء فريقنا خلال يوم عمل واحد."
    en_note = f"Need help sooner? Call us toll-free on {PHONE} or chat with us on WhatsApp."
    ar_note = f"هل تحتاج إلى مساعدة أسرع؟ اتصل بنا على الرقم المجاني {PHONE} أو تحدث معنا عبر واتساب."
    text = (
        f"{en_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in en_rows) + f"\n\n{en_note}\n\n"
        f"{ar_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in ar_rows) + f"\n\n{ar_note}\n\nEurogulf Mobility Group · WE MOVE YOU!"
    )
    html_body = _layout({"en_heading": "Thank you, we received your enquiry", "en_intro": en_intro, "en_rows": en_rows, "en_note": en_note,
                         "ar_heading": "شكراً لك، استلمنا استفسارك", "ar_intro": ar_intro, "ar_rows": ar_rows, "ar_note": ar_note})
    return subject, text, html_body


def booking_confirmation(b: dict) -> tuple[str, str, str]:
    name, ref = b.get("name", ""), b.get("reference", "")
    price = f"AED {b.get('price', '')}"
    en_rows = [("Reference", ref), ("Date and time", f"{b.get('date', '')} at {b.get('time', '')}"), ("Duration", b.get("duration", "")),
               ("Vehicle", b.get("vehicle", "")), ("Passengers", b.get("passengers", "")), ("Pickup", b.get("pickup_location", "")),
               ("Drop-off", b.get("dropoff_location", "")), ("Estimated price", price)]
    ar_rows = [("رقم المرجع", ref), ("التاريخ والوقت", f"{b.get('date', '')} في {b.get('time', '')}"), ("المدة", b.get("duration", "")),
               ("المركبة", b.get("vehicle", "")), ("عدد الركاب", b.get("passengers", "")), ("نقطة الانطلاق", b.get("pickup_location", "")),
               ("الوجهة", b.get("dropoff_location", "")), ("السعر التقديري", price)]
    subject = f"Chauffeur booking {ref} received | تم استلام حجزك - Eurogulf Premium Chauffeur"
    en_intro = f"Dear {name}, thank you for booking with Eurogulf Premium Chauffeur. Your request {ref} has been received and is pending confirmation. Our team will confirm your chauffeur and vehicle shortly."
    ar_intro = f"عزيزنا {name}، شكراً لحجزك مع يوروجلف بريميوم شوفير. تم استلام طلبك رقم {ref} وهو قيد التأكيد. سيؤكد فريقنا السائق والمركبة في أقرب وقت."
    en_note = f"To change or cancel, reply to this email or call {PHONE} (toll-free, 24/7)."
    ar_note = f"للتعديل أو الإلغاء، يرجى الرد على هذا البريد أو الاتصال على {PHONE} (مجاني، على مدار الساعة)."
    text = (
        f"{en_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in en_rows) + f"\n\n{en_note}\n\n"
        f"{ar_intro}\n\n" + "\n".join(f"{k}: {v}" for k, v in ar_rows) + f"\n\n{ar_note}\n\nEurogulf Mobility Group · WE MOVE YOU!"
    )
    html_body = _layout({"en_heading": f"Booking {ref} received", "en_intro": en_intro, "en_rows": en_rows, "en_note": en_note,
                         "ar_heading": f"تم استلام الحجز {ref}", "ar_intro": ar_intro, "ar_rows": ar_rows, "ar_note": ar_note})
    return subject, text, html_body
