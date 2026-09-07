"""Iteration 25: customer confirmation emails + email-preview endpoint.

SMTP is intentionally disabled (SMTP_ENABLED=false). We assert:
- POST /api/contact + /api/bookings write TEST_ docs, respond 200 in <2s
- Backend log gains skip lines for team alert AND customer confirmation
- GET /api/admin/email-preview requires auth and returns bilingual HTML
- HTML escaping in contact_confirmation
"""
import os, time, re, subprocess, sys
import pytest, requests
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

BASE = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
ADMIN_EMAIL = "admin@egmg.ae"
ADMIN_PASSWORD = "EgmgAdmin2026!"
LOG_PATH = "/var/log/supervisor/backend.err.log"

sys.path.insert(0, "/app/backend")


@pytest.fixture(scope="module")
def s():
    return requests.Session()


@pytest.fixture(scope="module")
def admin(s):
    r = s.post(f"{BASE}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=10)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    return s


def _tail(n=400):
    try:
        return subprocess.check_output(["tail", "-n", str(n), LOG_PATH], text=True)
    except Exception:
        return ""


# ---------- Contact flow ----------
def test_contact_confirmation_and_alert_skip_logs():
    marker_email = "confirm-qa@test.ae"
    payload = {"full_name": "TEST_ Confirm", "company": "TEST_ Co", "email": marker_email,
               "phone": "+971500000000", "enquiry_type": "General", "message": "test message"}
    t0 = time.time()
    r = requests.post(f"{BASE}/api/contact", json=payload, timeout=10)
    elapsed = time.time() - t0
    assert r.status_code == 200, r.text
    assert elapsed < 3, f"contact response too slow: {elapsed:.2f}s"
    time.sleep(1.5)  # let BackgroundTasks flush
    log = _tail(600)
    assert "SMTP not configured" in log
    assert f"[to=et_reservations@eurogulf.ae]" in log and "New website enquiry" in log
    assert f"[to={marker_email}]" in log and "We received your enquiry" in log


# ---------- Booking flow ----------
def test_booking_confirmation_and_alert_skip_logs():
    marker_email = "confirm-qa@test.ae"
    payload = {"name": "TEST_ Confirm", "email": marker_email, "phone": "+971500000000",
               "date": "2026-11-01", "time": "10:00", "duration": "4h",
               "vehicle": "Mercedes-Benz S-Class", "passengers": "3",
               "pickup_type": "airport", "pickup_location": "DXB T3",
               "dropoff_type": "location", "dropoff_location": "DIFC", "price": 850}
    t0 = time.time()
    r = requests.post(f"{BASE}/api/bookings", json=payload, timeout=10)
    elapsed = time.time() - t0
    assert r.status_code == 200, r.text
    assert elapsed < 3, f"booking response too slow: {elapsed:.2f}s"
    ref = r.json().get("reference", "")
    assert ref.startswith("RL-")
    time.sleep(1.5)
    log = _tail(800)
    assert f"[to=et_reservations@eurogulf.ae]" in log
    assert f"New chauffeur booking {ref}" in log
    assert f"[to={marker_email}]" in log
    assert f"Chauffeur booking {ref} received" in log


# ---------- Email preview endpoint ----------
def test_email_preview_requires_auth():
    r = requests.get(f"{BASE}/api/admin/email-preview?type=booking", timeout=10)
    assert r.status_code == 401


def test_email_preview_booking(admin):
    r = admin.get(f"{BASE}/api/admin/email-preview?type=booking", timeout=10)
    assert r.status_code == 200
    assert "text/html" in r.headers.get("content-type", "")
    body = r.text
    for needle in ["RL-SAMPLE01", "EUROGULF MOBILITY GROUP", "WE MOVE YOU!",
                   "تم استلام الحجز", "800 364", 'dir="rtl"']:
        assert needle in body, f"missing '{needle}' in booking preview"


def test_email_preview_contact(admin):
    r = admin.get(f"{BASE}/api/admin/email-preview?type=contact", timeout=10)
    assert r.status_code == 200
    body = r.text
    assert "Sara Al Mansoori" in body
    assert "we received your enquiry" in body.lower()
    assert "استلمنا استفسارك" in body


# ---------- HTML escaping ----------
def test_contact_confirmation_html_escaping():
    from emailer import contact_confirmation
    _, _, h = contact_confirmation({"full_name": "<script>x</script>", "email": "a@b.c",
                                    "phone": "1", "enquiry_type": "General", "message": "<b>hi</b>"})
    assert "<script>" not in h
    assert "&lt;script&gt;" in h
    assert "<b>hi</b>" not in h
    assert "&lt;b&gt;hi&lt;/b&gt;" in h


# ---------- Cleanup ----------
def test_cleanup_test_docs():
    async def _clean():
        client = AsyncIOMotorClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
        db = client[os.environ.get("DB_NAME", "test_database")]
        r1 = await db.contact_submissions.delete_many({"full_name": {"$regex": "^TEST_"}})
        r2 = await db.bookings.delete_many({"name": {"$regex": "^TEST_"}})
        client.close()
        return r1.deleted_count, r2.deleted_count
    c, b = asyncio.run(_clean())
    print(f"cleaned contacts={c} bookings={b}")
    assert c >= 1 and b >= 1
