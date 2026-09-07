"""Security audit verification tests for iteration 21."""
import os
import time
import struct
import zlib
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://egmg-premium.preview.emergentagent.com').rstrip('/')
LOCAL_URL = "http://localhost:8001"
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@egmg.ae")
ADMIN_PASS = os.environ["ADMIN_PASSWORD"]


def _tiny_png():
    # Minimal valid 1x1 PNG
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = b"IHDR" + struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0)
    ihdr_chunk = struct.pack(">I", 13) + ihdr + struct.pack(">I", zlib.crc32(ihdr))
    raw = b"\x00\xff\x00\x00"
    comp = zlib.compress(raw)
    idat = b"IDAT" + comp
    idat_chunk = struct.pack(">I", len(comp)) + idat + struct.pack(">I", zlib.crc32(idat))
    iend = b"IEND"
    iend_chunk = struct.pack(">I", 0) + iend + struct.pack(">I", zlib.crc32(iend))
    return sig + ihdr_chunk + idat_chunk + iend_chunk


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return s


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200
    token = r.cookies.get("access_token")
    assert token
    return token


# ─────────────── AUTH GATE on contacts/bookings ───────────────

def test_contacts_requires_auth():
    r = requests.get(f"{API}/contacts")
    assert r.status_code == 401

def test_bookings_requires_auth():
    r = requests.get(f"{API}/bookings")
    assert r.status_code == 401

def test_contacts_with_bearer(admin_token):
    r = requests.get(f"{API}/contacts", headers={"Authorization": f"Bearer {admin_token}"})
    assert r.status_code == 200
    assert isinstance(r.json(), list)

def test_bookings_with_bearer(admin_token):
    r = requests.get(f"{API}/bookings", headers={"Authorization": f"Bearer {admin_token}"})
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ─────────────── AUTH FLOW ───────────────

def test_login_sets_cookies():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200
    set_cookie = r.headers.get("set-cookie", "") + " " + " ".join(r.raw.headers.getlist("set-cookie") if hasattr(r.raw.headers, "getlist") else [])
    combined = " ".join([v for k, v in r.raw.headers.items() if k.lower() == "set-cookie"]) if hasattr(r.raw.headers, "items") else set_cookie
    # Query local backend directly to observe raw Secure flag (proxy may rewrite)
    r2 = requests.post(f"{LOCAL_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r2.status_code == 200
    raw = "\n".join(v for k, v in r2.raw.headers.items() if k.lower() == "set-cookie")
    assert "access_token" in raw
    assert "refresh_token" in raw
    assert "HttpOnly" in raw
    assert "Secure" in raw

def test_me_with_cookie(admin_session):
    r = admin_session.get(f"{API}/auth/me")
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL

def test_refresh(admin_session):
    r = admin_session.post(f"{API}/auth/refresh")
    assert r.status_code == 200

def test_logout_and_wrong_password():
    s = requests.Session()
    s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    r = s.post(f"{API}/auth/logout")
    assert r.status_code == 200
    # wrong pw
    r2 = requests.post(f"{API}/auth/login", json={"email": "lockout@test.ae", "password": "wrongpass"})
    assert r2.status_code == 401

def test_bruteforce_lockout():
    # Test against localhost because the preview proxy varies client IP
    # (request.client.host is proxy IP, unstable), so lockout only asserts on localhost.
    email = "lockout3@test.ae"
    for _ in range(5):
        requests.post(f"{LOCAL_URL}/api/auth/login", json={"email": email, "password": "wrong"})
    r = requests.post(f"{LOCAL_URL}/api/auth/login", json={"email": email, "password": "wrong"})
    assert r.status_code == 429


# ─────────────── ARTICLE VALIDATION ───────────────

def test_article_video_js_scheme_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_bad","body":"x","category":"Test","video_url":"javascript:alert(1)"})
    assert r.status_code == 422

def test_article_video_bad_host_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_bad2","body":"x","category":"Test","video_url":"https://evil.example/embed"})
    assert r.status_code == 422

def test_article_video_youtube_ok(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_ytok","body":"x","category":"Test","video_url":"https://www.youtube.com/embed/dQw4w9WgXcQ"})
    assert r.status_code == 200
    art_id = r.json()["id"]
    # cleanup
    requests.delete(f"{API}/articles/{art_id}", headers=h)

def test_article_image_js_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_imgjs","body":"x","category":"Test","image_url":"javascript:x"})
    assert r.status_code == 422

def test_article_image_upload_path_ok(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_imgup","body":"x","category":"Test","image_url":"/api/uploads/abc.png"})
    assert r.status_code == 200
    requests.delete(f"{API}/articles/{r.json()['id']}", headers=h)

def test_article_pdf_https_ok(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_pdf","body":"x","category":"Test","pdf_url":"https://egmg.ae/file.pdf"})
    assert r.status_code == 200
    requests.delete(f"{API}/articles/{r.json()['id']}", headers=h)

def test_article_update_data_scheme_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/articles", headers=h, json={"title":"TEST_upd","body":"x","category":"Test"})
    assert r.status_code == 200
    aid = r.json()["id"]
    r2 = requests.put(f"{API}/articles/{aid}", headers=h, json={"image_url":"data:text/html,x"})
    assert r2.status_code == 422
    requests.delete(f"{API}/articles/{aid}", headers=h)


# ─────────────── UPLOAD HARDENING ───────────────

def test_upload_unauth():
    r = requests.post(f"{API}/upload", files={"file": ("a.png", b"fake", "image/png")})
    assert r.status_code == 401

def test_upload_fake_png_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/upload", headers=h, files={"file": ("fake.png", b"not really a png", "image/png")})
    assert r.status_code == 400
    assert "does not match" in r.text

def test_upload_real_png_ok(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/upload", headers=h, files={"file": ("real.png", _tiny_png(), "image/png")})
    assert r.status_code == 200, r.text
    url = r.json()["url"]
    assert url.startswith("/api/uploads/")
    # Fetch it
    r2 = requests.get(f"{BASE_URL}{url}")
    assert r2.status_code == 200
    assert r2.headers.get("content-type", "").startswith("image/png")
    assert r2.headers.get("x-content-type-options", "").lower() == "nosniff"

def test_upload_exe_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/upload", headers=h, files={"file": ("a.exe", b"MZ...", "application/octet-stream")})
    assert r.status_code == 400

def test_upload_svg_rejected(admin_token):
    h = {"Authorization": f"Bearer {admin_token}"}
    r = requests.post(f"{API}/upload", headers=h, files={"file": ("a.svg", b"<svg/>", "image/svg+xml")})
    assert r.status_code == 400


# ─────────────── REGEX SAFETY ───────────────

def test_regex_search_safe():
    t0 = time.time()
    r = requests.get(f"{API}/articles", params={"search": "(a+)+$"})
    dur = time.time() - t0
    assert r.status_code == 200
    assert dur < 2.0

def test_search_matches():
    r = requests.get(f"{API}/articles", params={"search": "EGMG"})
    assert r.status_code == 200
    data = r.json()
    assert data["total"] >= 1


# ─────────────── CORS (against localhost, since proxy rewrites) ───────────────

def test_cors_evil_origin_blocked():
    r = requests.options(f"{LOCAL_URL}/api/contact", headers={
        "Origin": "https://evil.example",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    })
    aco = r.headers.get("access-control-allow-origin", "")
    assert aco != "https://evil.example"
    assert aco != "*"

def test_cors_allowed_origin():
    r = requests.options(f"{LOCAL_URL}/api/contact", headers={
        "Origin": "https://egmg-premium.preview.emergentagent.com",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
    })
    assert r.headers.get("access-control-allow-origin") == "https://egmg-premium.preview.emergentagent.com"
    assert r.headers.get("access-control-allow-credentials") == "true"


# ─────────────── PUBLIC FLOWS ───────────────

def test_public_contact():
    r = requests.post(f"{API}/contact", json={
        "full_name":"TEST_John","email":"t@test.ae","phone":"+971500000000",
        "enquiry_type":"general","message":"hello"
    })
    assert r.status_code == 200
    assert r.json()["email"] == "t@test.ae"

def test_public_booking():
    r = requests.post(f"{API}/bookings", json={
        "duration":"4h","date":"2026-02-01","time":"10:00",
        "pickup_type":"airport","pickup_location":"DXB",
        "dropoff_type":"location","dropoff_location":"Downtown",
        "passengers":"3","vehicle":"Mercedes S-Class","price":500,
        "name":"TEST_Jane","email":"j@test.ae","phone":"+971500000001"
    })
    assert r.status_code == 200
    assert r.json()["reference"].startswith("RL-")

def test_articles_list():
    r = requests.get(f"{API}/articles")
    assert r.status_code == 200
    assert r.json()["total"] >= 1

def test_article_by_id():
    lst = requests.get(f"{API}/articles").json()["articles"]
    r = requests.get(f"{API}/articles/{lst[0]['id']}")
    assert r.status_code == 200
