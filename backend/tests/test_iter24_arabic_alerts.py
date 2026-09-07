"""Iteration 24 tests: Arabic article fields + SMTP-disabled email alerts."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://egmg-premium.preview.emergentagent.com').rstrip('/')
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@egmg.ae")
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    return s


# ═══════════════ Arabic articles ═══════════════

class TestArabicArticles:
    article_id = None

    def test_create_article_with_arabic(self, admin_session):
        payload = {
            "title": "TEST_ AR article",
            "title_ar": "مقالة تجريبية",
            "body": "<p>en</p>",
            "body_ar": "<p>نص عربي</p>",
            "category": "Awards",
        }
        r = admin_session.post(f"{BASE_URL}/api/articles", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["title"] == "TEST_ AR article"
        assert data["title_ar"] == "مقالة تجريبية"
        assert data["body_ar"] == "<p>نص عربي</p>"
        assert "id" in data
        TestArabicArticles.article_id = data["id"]

    def test_get_article_returns_ar(self, admin_session):
        aid = TestArabicArticles.article_id
        r = requests.get(f"{BASE_URL}/api/articles/{aid}", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["title_ar"] == "مقالة تجريبية"
        assert d["body_ar"] == "<p>نص عربي</p>"

    def test_update_article_title_ar(self, admin_session):
        aid = TestArabicArticles.article_id
        r = admin_session.put(f"{BASE_URL}/api/articles/{aid}", json={"title_ar": "عنوان محدث"}, timeout=15)
        assert r.status_code == 200
        assert r.json()["title_ar"] == "عنوان محدث"

    def test_search_by_title_ar(self, admin_session):
        r = requests.get(f"{BASE_URL}/api/articles", params={"search": "محدث"}, timeout=15)
        assert r.status_code == 200
        ids = [a["id"] for a in r.json()["articles"]]
        assert TestArabicArticles.article_id in ids

    def test_search_by_title_en(self, admin_session):
        r = requests.get(f"{BASE_URL}/api/articles", params={"search": "TEST_"}, timeout=15)
        assert r.status_code == 200
        ids = [a["id"] for a in r.json()["articles"]]
        assert TestArabicArticles.article_id in ids

    def test_title_ar_too_long_rejected(self, admin_session):
        payload = {"title": "TEST_ too long ar", "title_ar": "ع" * 501, "category": "Awards"}
        r = admin_session.post(f"{BASE_URL}/api/articles", json=payload, timeout=15)
        assert r.status_code == 422, f"Expected 422 got {r.status_code}"

    def test_zzz_cleanup_article(self, admin_session):
        aid = TestArabicArticles.article_id
        if aid:
            r = admin_session.delete(f"{BASE_URL}/api/articles/{aid}", timeout=15)
            assert r.status_code == 200


# ═══════════════ Email alerts (SMTP disabled) ═══════════════

class TestEmailAlerts:
    contact_id = None
    booking_id = None

    def test_alerts_status_unauth(self):
        r = requests.get(f"{BASE_URL}/api/admin/alerts-status", timeout=15)
        assert r.status_code == 401

    def test_alerts_status_auth(self, admin_session):
        r = admin_session.get(f"{BASE_URL}/api/admin/alerts-status", timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["smtp_configured"] is False
        assert d["alert_email"] == "et_reservations@eurogulf.ae"

    def test_contact_post_fast(self):
        payload = {
            "full_name": "TEST_ Contact User",
            "company": "TEST Corp",
            "email": "test_contact@example.com",
            "phone": "+971500000000",
            "enquiry_type": "General",
            "message": "Test iter24 message",
        }
        t0 = time.time()
        r = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=15)
        elapsed = time.time() - t0
        assert r.status_code == 200, r.text
        assert elapsed < 2.0, f"Contact POST took {elapsed:.2f}s"
        TestEmailAlerts.contact_id = r.json()["id"]

    def test_booking_post_fast(self):
        payload = {
            "duration": "4h", "date": "2026-02-01", "time": "10:00",
            "pickup_type": "airport", "pickup_location": "DXB T1",
            "dropoff_type": "location", "dropoff_location": "Downtown",
            "passengers": "3", "vehicle": "BMW 7", "price": 750,
            "name": "TEST_ Booking User", "email": "test_book@example.com",
            "phone": "+971500000001", "notes": "iter24",
        }
        t0 = time.time()
        r = requests.post(f"{BASE_URL}/api/bookings", json=payload, timeout=15)
        elapsed = time.time() - t0
        assert r.status_code == 200, r.text
        assert elapsed < 2.0, f"Booking POST took {elapsed:.2f}s"
        d = r.json()
        assert d["reference"].startswith("RL-")
        TestEmailAlerts.booking_id = d["id"]

    def test_backend_log_has_skip_lines(self):
        # Wait a moment for background tasks to log
        time.sleep(2)
        with open("/var/log/supervisor/backend.err.log", "r", errors="ignore") as f:
            content = f.read()
        assert "SMTP not configured; alert skipped: New website enquiry" in content, "Missing contact skip log"
        assert "alert skipped: New chauffeur booking RL-" in content, "Missing booking skip log"

    def test_zzz_cleanup_docs(self, admin_session):
        from pymongo import MongoClient
        m = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
        db = m[os.environ.get("DB_NAME", "test_database")]
        db.contact_submissions.delete_many({"full_name": {"$regex": "^TEST_"}})
        db.bookings.delete_many({"name": {"$regex": "^TEST_"}})
        m.close()
