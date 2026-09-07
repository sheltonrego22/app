"""Iteration 22: Brute-force lockout via XFF + admin error surfacing regressions."""
import os
import requests
import pytest
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).resolve().parents[1] / ".env")

PUBLIC_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/') if os.environ.get('REACT_APP_BACKEND_URL') else "https://egmg-premium.preview.emergentagent.com"
LOCAL_URL = "http://localhost:8001"
PUBLIC_API = f"{PUBLIC_URL}/api"
LOCAL_API = f"{LOCAL_URL}/api"

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@egmg.ae")
ADMIN_PASS = os.environ["ADMIN_PASSWORD"]

MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    c.close()


def _clean(mongo, email_sub):
    mongo.login_attempts.delete_many({"identifier": {"$regex": email_sub}})


# ─────────── 1. Public URL brute-force lockout uses XFF ───────────
def test_public_lockout_via_xff(mongo):
    email = "lockout-qa@test.ae"
    _clean(mongo, email)
    codes = []
    for _ in range(5):
        r = requests.post(f"{PUBLIC_API}/auth/login", json={"email": email, "password": "wrongpw!"})
        codes.append(r.status_code)
    r6 = requests.post(f"{PUBLIC_API}/auth/login", json={"email": email, "password": "wrongpw!"})
    print(f"attempts 1-5: {codes}, 6th: {r6.status_code} {r6.text[:200]}")
    assert all(c == 401 for c in codes), f"Expected all 401, got {codes}"
    assert r6.status_code == 429
    detail = r6.json().get("detail", "")
    assert "15 minutes" in detail
    _clean(mongo, email)


# ─────────── 2. Lockout is per-IP+email, does not affect admin ───────────
def test_admin_still_works_after_other_email_locked(mongo):
    email = "lockout-qa2@test.ae"
    _clean(mongo, email)
    for _ in range(6):
        requests.post(f"{PUBLIC_API}/auth/login", json={"email": email, "password": "wrongpw!"})
    # Admin correct pw should still 200
    r = requests.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200, f"Admin login should still work: {r.status_code} {r.text[:200]}"
    _clean(mongo, email)


# ─────────── 3. Successful login clears counters ───────────
def test_success_resets_counter(mongo):
    _clean(mongo, ADMIN_EMAIL)
    # 2 wrong
    for _ in range(2):
        r = requests.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpw!"})
        assert r.status_code == 401
    # correct
    r_ok = requests.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r_ok.status_code == 200
    # 4 more wrong -> should still be 401, not 429
    codes = []
    for _ in range(4):
        r = requests.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpw!"})
        codes.append(r.status_code)
    print(f"post-reset codes: {codes}")
    assert all(c == 401 for c in codes), f"counters not reset, got {codes}"
    # Finish with a correct login so admin is not locked
    r_final = requests.post(f"{PUBLIC_API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r_final.status_code == 200
    _clean(mongo, ADMIN_EMAIL)


# ─────────── 4. Spoofed XFF proves IP derived from header ───────────
def test_xff_header_used_on_localhost(mongo):
    email = "lockout-qa-xff@test.ae"
    _clean(mongo, email)
    for _ in range(5):
        r = requests.post(f"{LOCAL_API}/auth/login",
                          json={"email": email, "password": "wrongpw!"},
                          headers={"X-Forwarded-For": "1.1.1.1"})
        assert r.status_code == 401
    # 6th with different IP -> different ip_key, should return 401 (not 429)
    r_other_ip = requests.post(f"{LOCAL_API}/auth/login",
                               json={"email": email, "password": "wrongpw!"},
                               headers={"X-Forwarded-For": "2.2.2.2"})
    print(f"different IP status: {r_other_ip.status_code}")
    assert r_other_ip.status_code == 401, f"different IP should be 401, got {r_other_ip.status_code}"
    # Same IP again 1.1.1.1 should be 429
    r_same_ip = requests.post(f"{LOCAL_API}/auth/login",
                              json={"email": email, "password": "wrongpw!"},
                              headers={"X-Forwarded-For": "1.1.1.1"})
    assert r_same_ip.status_code == 429
    _clean(mongo, email)


# ─────────── 5. Account-level throttle: 20 total failures across IPs ───────────
def test_account_level_throttle(mongo):
    email = "lockout-qa-acct@test.ae"
    _clean(mongo, email)
    # Use 20 distinct IPs so per-IP limit is never hit, only account key accumulates
    for i in range(20):
        r = requests.post(f"{LOCAL_API}/auth/login",
                          json={"email": email, "password": "wrongpw!"},
                          headers={"X-Forwarded-For": f"10.0.0.{i+1}"})
        assert r.status_code == 401, f"attempt {i}: {r.status_code}"
    # 21st from yet another new IP -> should be 429 due to account key
    r_next = requests.post(f"{LOCAL_API}/auth/login",
                           json={"email": email, "password": "wrongpw!"},
                           headers={"X-Forwarded-For": "10.0.0.99"})
    print(f"account-throttle status: {r_next.status_code} {r_next.text[:200]}")
    assert r_next.status_code == 429
    _clean(mongo, email)


# ─────────── 6. Regressions ───────────
def test_contacts_still_requires_auth():
    r = requests.get(f"{PUBLIC_API}/contacts")
    assert r.status_code == 401

def test_public_contact_ok():
    r = requests.post(f"{PUBLIC_API}/contact", json={
        "full_name": "TEST_iter22", "email": "iter22@test.ae", "phone": "+971500000000",
        "enquiry_type": "general", "message": "hi"
    })
    assert r.status_code == 200

def test_articles_list_ok():
    r = requests.get(f"{PUBLIC_API}/articles")
    assert r.status_code == 200
    assert r.json()["total"] >= 1
