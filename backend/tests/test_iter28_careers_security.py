"""Iteration 28: careers apply/CV endpoints, trusted-IP rate limiting on public forms, brand rule in seed."""
import io
import os
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

PUBLIC_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://egmg-premium.preview.emergentagent.com").rstrip("/")
LOCAL_API = "http://localhost:8001/api"
PUBLIC_API = f"{PUBLIC_URL}/api"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@egmg.ae")
ADMIN_PASS = os.environ["ADMIN_PASSWORD"]
PDF = b"%PDF-1.4\n%QA test cv\n"


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(os.environ["MONGO_URL"])
    yield c[os.environ["DB_NAME"]]
    c.close()


@pytest.fixture(autouse=True)
def clear_rate_limits(mongo):
    mongo.rate_limits.delete_many({})
    yield
    mongo.rate_limits.delete_many({})


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200, r.text
    return s


def _apply(api, ip, **overrides):
    data = {"full_name": "QA Candidate", "email": "qa.candidate@test.ae", "phone": "+971500000001", "role": "Process Analyst", "lang": "en"}
    data.update(overrides)
    files = {"cv": ("cv.pdf", io.BytesIO(PDF), "application/pdf")}
    return requests.post(f"{api}/careers/apply", data=data, files=files, headers={"X-Forwarded-For": ip})


# ─────────── Apply: happy path lands in inbox with CV ───────────
def _cleanup_submission(mongo, doc):
    mongo.contact_submissions.delete_one({"id": doc["id"]})
    mongo.cv_files.delete_one({"id": doc["attachment_url"].rsplit("/", 1)[1]})


@pytest.fixture
def application(mongo):
    r = _apply(LOCAL_API, "203.0.113.10", full_name=f"QA {uuid.uuid4().hex[:6]}", linkedin_url="https://www.linkedin.com/in/qa-candidate")
    assert r.status_code == 200, r.text
    doc = mongo.contact_submissions.find_one({"id": r.json()["id"]})
    yield doc
    _cleanup_submission(mongo, doc)


def test_apply_stores_submission_fields(application):
    assert application["enquiry_type"] == "Careers: Process Analyst"
    assert application["role"] == "Process Analyst"
    assert application["linkedin_url"] == "https://www.linkedin.com/in/qa-candidate"
    assert application["attachment_url"].startswith("/api/admin/cv/")


def test_cv_download_requires_admin(application, admin_session):
    url = f"{PUBLIC_URL}{application['attachment_url']}"
    assert requests.get(url).status_code == 401
    dl = admin_session.get(url)
    assert dl.status_code == 200
    assert dl.content == PDF
    assert dl.headers["Content-Type"].startswith("application/pdf")
    assert "attachment" in dl.headers["Content-Disposition"]


def test_application_visible_in_admin_inbox(application, admin_session):
    inbox = admin_session.get(f"{PUBLIC_API}/contacts?limit=50").json()
    match = next(c for c in inbox if c["id"] == application["id"])
    assert match["attachment_url"] == application["attachment_url"]


# ─────────── Apply: validation ───────────
def test_apply_rejects_bad_extension():
    files = {"cv": ("cv.exe", io.BytesIO(b"MZ..."), "application/octet-stream")}
    r = requests.post(f"{LOCAL_API}/careers/apply", data={"full_name": "QA", "email": "qa@test.ae", "phone": "+97150", "role": "Role"}, files=files)
    assert r.status_code == 400


def test_apply_rejects_mismatched_magic_bytes():
    files = {"cv": ("cv.pdf", io.BytesIO(b"not really a pdf"), "application/pdf")}
    r = requests.post(f"{LOCAL_API}/careers/apply", data={"full_name": "QA", "email": "qa@test.ae", "phone": "+97150", "role": "Role"}, files=files)
    assert r.status_code == 400


def test_apply_rejects_invalid_email_and_linkedin():
    assert _apply(LOCAL_API, "203.0.113.11", email="not-an-email").status_code == 422
    assert _apply(LOCAL_API, "203.0.113.11", linkedin_url="https://evil.example/in/x").status_code == 422


def test_apply_rejects_blank_name(mongo):
    before = mongo.contact_submissions.count_documents({"enquiry_type": "Careers: Process Analyst", "full_name": ""})
    r = _apply(LOCAL_API, "203.0.113.12", full_name="   ")
    assert r.status_code == 422
    assert mongo.contact_submissions.count_documents({"enquiry_type": "Careers: Process Analyst", "full_name": ""}) == before


def test_apply_rate_limit_per_ip(mongo):
    ip = "203.0.113.20"
    ids = []
    for _ in range(5):
        r = _apply(LOCAL_API, ip)
        assert r.status_code == 200, r.text
        ids.append(r.json()["id"])
    r6 = _apply(LOCAL_API, ip)
    assert r6.status_code == 429
    assert "800 364" in r6.json()["detail"]
    for sub in mongo.contact_submissions.find({"id": {"$in": ids}}):
        _cleanup_submission(mongo, sub)


# ─────────── Trusted-IP: spoofed X-Forwarded-For does not bypass limits ───────────
def _contact(api, headers=None, **overrides):
    body = {"full_name": "QA Contact", "email": "qa.contact@test.ae", "phone": "+971500000002", "enquiry_type": "QA", "message": "rate limit test"}
    body.update(overrides)
    return requests.post(f"{api}/contact", json=body, headers=headers or {})


def test_contact_rate_limit_ignores_spoofed_xff_via_public_proxy(mongo):
    # Through the real proxy chain the client IP is derived from the trusted hop, so rotating the header changes nothing.
    codes = []
    for i in range(20):
        codes.append(_contact(PUBLIC_API, headers={"X-Forwarded-For": f"198.51.100.{i + 1}"}).status_code)
    assert all(c == 200 for c in codes), codes
    blocked = _contact(PUBLIC_API, headers={"X-Forwarded-For": "198.51.100.250"})
    assert blocked.status_code == 429
    mongo.contact_submissions.delete_many({"email": "qa.contact@test.ae"})


def test_contact_rate_limit_local_trusted_hops(mongo):
    # Direct to backend, simulate proxy chain: client, cloudflare, lb (TRUSTED_PROXY_HOPS=2)
    chain = lambda spoof: {"X-Forwarded-For": f"{spoof}, 192.0.2.77, 172.69.1.1, 136.110.1.1"}
    for i in range(20):
        assert _contact(LOCAL_API, headers=chain(f"10.9.{i}.1")).status_code == 200
    assert _contact(LOCAL_API, headers=chain("10.9.99.1")).status_code == 429
    # A genuinely different client is not blocked
    assert _contact(LOCAL_API, headers={"X-Forwarded-For": "192.0.2.78, 172.69.1.1, 136.110.1.1"}).status_code == 200
    mongo.contact_submissions.delete_many({"email": "qa.contact@test.ae"})


def test_contact_rejects_blank_fields():
    assert _contact(LOCAL_API, full_name="   ").status_code == 422
    assert _contact(LOCAL_API, phone="  ").status_code == 422


def test_booking_rate_limit(mongo):
    body = {"duration": "4h", "date": "2026-10-01", "time": "10:00", "pickup_type": "airport", "pickup_location": "DXB T3",
            "dropoff_type": "location", "dropoff_location": "Downtown", "passengers": "3", "vehicle": "Mercedes S-Class",
            "price": 800, "name": "QA Booking", "email": "qa.booking@test.ae", "phone": "+971500000003"}
    hdr = {"X-Forwarded-For": "203.0.113.30"}
    for _ in range(20):
        assert requests.post(f"{LOCAL_API}/bookings", json=body, headers=hdr).status_code == 200
    assert requests.post(f"{LOCAL_API}/bookings", json=body, headers=hdr).status_code == 429
    assert requests.post(f"{LOCAL_API}/bookings", json={**body, "name": "  "}, headers={"X-Forwarded-For": "203.0.113.31"}).status_code == 422
    mongo.bookings.delete_many({"email": "qa.booking@test.ae"})


# ─────────── Brand rule ───────────
def test_no_standalone_egmg_in_public_articles():
    r = requests.get(f"{PUBLIC_API}/articles?limit=50")
    assert r.status_code == 200
    for a in r.json()["articles"]:
        assert "EGMG" not in a["title"].replace("Eurogulf Mobility Group", ""), a["title"]
        assert "EGMG" not in (a.get("body") or ""), a["title"]


def test_root_message_uses_full_brand():
    assert "Eurogulf Mobility Group" in requests.get(f"{PUBLIC_API}/").json()["message"]
