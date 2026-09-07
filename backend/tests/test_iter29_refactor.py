"""Iteration 29 regression tests: verify behaviour is preserved after refactor of
POST /api/careers/apply (Depends(application_form) + helpers) and startup split
(ensure_indexes/seed_admin/seed_articles/apply_brand_rule)."""
import os
import io
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
ADMIN_EMAIL = "admin@egmg.ae"
ADMIN_PASSWORD = "EgmgAdmin2026!"

PDF_HEADER = b"%PDF-1.4\n"
DUMMY_PDF = PDF_HEADER + b"%hello world" + b"\n" * 20


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(os.environ["MONGO_URL"])
    yield c[os.environ["DB_NAME"]]
    c.close()


@pytest.fixture
def cleanup_submissions(mongo):
    created = []
    yield created
    if created:
        mongo.contact_submissions.delete_many({"id": {"$in": created}})
        mongo.cv_files.delete_many({"id": {"$in": created}})


def _apply(files=None, data=None):
    data = {
        "full_name": "Jane Applicant",
        "email": "jane.iter29@example.com",
        "phone": "+971501234567",
        "role": "QA Engineer",
        "message": "Hello",
        "linkedin_url": "",
        "lang": "en",
        **(data or {}),
    }
    files = files or {"cv": ("cv.pdf", io.BytesIO(DUMMY_PDF), "application/pdf")}
    return requests.post(f"{BASE_URL}/api/careers/apply", data=data, files=files, timeout=30)


# ---- root and articles seed ----
def test_root_message():
    r = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code == 200
    assert r.json().get("message") == "Eurogulf Mobility Group API Running"


def test_articles_seed_no_standalone_egmg():
    r = requests.get(f"{BASE_URL}/api/articles", timeout=20)
    assert r.status_code == 200
    payload = r.json()
    articles = payload.get("articles", payload) if isinstance(payload, dict) else payload
    assert isinstance(articles, list)
    assert len(articles) >= 10, f"expected >=10 seeded articles, got {len(articles)}"
    import re
    bad = re.compile(r"(?<![A-Za-z])EGMG(?![A-Za-z])")
    for a in articles:
        for field in ("title", "excerpt", "content", "body"):
            v = a.get(field) or ""
            assert not bad.search(v), f"article {a.get('id')} field {field} contains standalone 'EGMG': {v[:120]}"


# ---- admin login (seed_admin) ----
def test_admin_login_still_works():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login",
               json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    me = s.get(f"{BASE_URL}/api/auth/me", timeout=15)
    assert me.status_code == 200
    assert me.json().get("email") == ADMIN_EMAIL


# ---- POST /api/careers/apply refactor behaviour ----
def test_apply_happy_path_returns_id(cleanup_submissions):
    r = _apply()
    assert r.status_code == 200, r.text
    body = r.json()
    assert "id" in body and body.get("status") == "received"
    cleanup_submissions.append(body["id"])


def test_apply_exe_rejected():
    files = {"cv": ("cv.exe", io.BytesIO(b"MZ\x90\x00" + b"\x00" * 20), "application/octet-stream")}
    r = _apply(files=files)
    assert r.status_code == 400
    assert "PDF" in r.json().get("detail", "")


def test_apply_pdf_wrong_magic_bytes_rejected():
    files = {"cv": ("cv.pdf", io.BytesIO(b"NOTPDF" + b"\x00" * 30), "application/pdf")}
    r = _apply(files=files)
    assert r.status_code == 400
    assert "content" in r.json().get("detail", "").lower()


def test_apply_invalid_email_422():
    r = _apply(data={"email": "not-an-email"})
    assert r.status_code == 422
    assert r.json().get("detail") == "Please enter a valid email address"


def test_apply_bad_linkedin_422():
    r = _apply(data={"linkedin_url": "https://example.com/in/jane"})
    assert r.status_code == 422
    assert "linkedin" in r.json().get("detail", "").lower()


def test_apply_whitespace_name_422():
    r = _apply(data={"full_name": "  "})
    assert r.status_code == 422


def test_apply_rate_limit_6th_returns_429(mongo, cleanup_submissions):
    mongo.rate_limits.delete_many({})
    for i in range(5):
        r = _apply(data={"email": f"rl.iter29.{i}@example.com"})
        assert r.status_code == 200, f"call {i} unexpectedly failed: {r.status_code} {r.text}"
        cleanup_submissions.append(r.json()["id"])
    r6 = _apply(data={"email": "rl.iter29.6@example.com"})
    assert r6.status_code == 429, r6.text
    mongo.rate_limits.delete_many({})


# ---- admin CV download ----
def test_admin_cv_download_401_and_200(cleanup_submissions):
    r = _apply(data={"email": "cvdl.iter29@example.com"})
    assert r.status_code == 200
    app_id = r.json()["id"]
    cleanup_submissions.append(app_id)

    # find the cv id from the submission attachment_url
    s = requests.Session()
    login = s.post(f"{BASE_URL}/api/auth/login",
                   json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert login.status_code == 200
    inbox_resp = s.get(f"{BASE_URL}/api/contacts", timeout=15).json()
    inbox = inbox_resp.get("contacts", inbox_resp) if isinstance(inbox_resp, dict) else inbox_resp
    doc = next((d for d in inbox if isinstance(d, dict) and d.get("id") == app_id), None)
    assert doc, "submission not found in admin inbox"
    att = doc.get("attachment_url") or ""
    assert att.startswith("/api/admin/cv/")
    cv_id = att.rsplit("/", 1)[-1]

    # unauth 401
    r401 = requests.get(f"{BASE_URL}/api/admin/cv/{cv_id}", timeout=15)
    assert r401.status_code == 401
    # auth 200 with PDF magic bytes
    r200 = s.get(f"{BASE_URL}/api/admin/cv/{cv_id}", timeout=15)
    assert r200.status_code == 200
    assert r200.content.startswith(b"%PDF")
