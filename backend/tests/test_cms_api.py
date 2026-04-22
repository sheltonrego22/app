"""
EGMG CMS - Auth + Articles backend tests
Covers: login (cookies), me, brute-force lockout, articles CRUD, filtering, search, auth-required endpoints
"""
import pytest
import requests
import os
import uuid
import time

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
ADMIN_EMAIL = "admin@egmg.ae"
ADMIN_PASSWORD = "EgmgAdmin2026!"


@pytest.fixture(scope="module")
def auth_session():
    s = requests.Session()
    r = s.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code == 429:
        # wait & try with junk-email to clear identifier (different identifier); just skip if locked
        pytest.skip(f"Login locked out (429). Body: {r.text}")
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    return s


# ─── AUTH ──────────────────────────────────────────────
class TestAuth:
    def test_login_success_returns_user_and_cookies(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        if r.status_code == 429:
            pytest.skip("Locked out from previous test runs")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "id" in data
        # Cookies
        assert "access_token" in r.cookies, f"access_token cookie missing. Cookies: {dict(r.cookies)}"
        assert "refresh_token" in r.cookies, "refresh_token cookie missing"
        # httpOnly check via Set-Cookie header
        sc = r.headers.get("set-cookie", "").lower()
        assert "httponly" in sc, "httpOnly flag not set on cookies"

    def test_get_me_with_valid_cookie(self, auth_session):
        r = auth_session.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"

    def test_get_me_without_cookie_returns_401(self):
        r = requests.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401


# ─── ARTICLES PUBLIC ──────────────────────────────────
class TestArticlesPublic:
    def test_get_articles_returns_list_with_total(self):
        r = requests.get(f"{BASE_URL}/api/articles")
        assert r.status_code == 200
        data = r.json()
        assert "articles" in data
        assert "total" in data
        assert isinstance(data["articles"], list)
        assert isinstance(data["total"], int)
        assert data["total"] >= 1
        # No mongo _id leaking
        for a in data["articles"]:
            assert "_id" not in a
            assert "id" in a
            assert "title" in a

    def test_filter_by_category_awards(self):
        r = requests.get(f"{BASE_URL}/api/articles", params={"category": "Awards"})
        assert r.status_code == 200
        data = r.json()
        assert all(a["category"] == "Awards" for a in data["articles"]), \
            f"Got categories: {[a['category'] for a in data['articles']]}"

    def test_search_by_title_egmg(self):
        r = requests.get(f"{BASE_URL}/api/articles", params={"search": "EGMG"})
        assert r.status_code == 200
        data = r.json()
        # Every result should contain "EGMG" (case-insensitive) in title
        for a in data["articles"]:
            assert "egmg" in a["title"].lower(), f"Search returned non-matching: {a['title']}"
        assert data["total"] >= 1

    def test_filter_featured_true(self):
        r = requests.get(f"{BASE_URL}/api/articles", params={"featured": "true"})
        assert r.status_code == 200
        data = r.json()
        assert all(a.get("featured") is True for a in data["articles"])


# ─── ARTICLES CRUD (auth) ─────────────────────────────
class TestArticlesCRUD:
    created_id = None

    def test_create_article_unauthenticated_returns_401(self):
        r = requests.post(f"{BASE_URL}/api/articles", json={
            "title": "TEST_unauth", "body": "<p>x</p>", "category": "Awards"
        })
        assert r.status_code == 401, f"Got {r.status_code} {r.text}"

    def test_create_article_authenticated(self, auth_session):
        unique = str(uuid.uuid4())[:8]
        payload = {
            "title": f"TEST_Article_{unique}",
            "body": "<p>Hello <strong>EGMG</strong></p>",
            "category": "Awards",
            "featured": True,
            "published": True,
            "image_url": "/api/uploads/sample.png",
        }
        r = auth_session.post(f"{BASE_URL}/api/articles", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["title"] == payload["title"]
        assert data["category"] == "Awards"
        assert data["featured"] is True
        assert "id" in data
        assert "_id" not in data
        TestArticlesCRUD.created_id = data["id"]

        # Verify GET persistence
        g = requests.get(f"{BASE_URL}/api/articles/{data['id']}")
        assert g.status_code == 200
        assert g.json()["title"] == payload["title"]

    def test_update_article(self, auth_session):
        assert TestArticlesCRUD.created_id, "Prior create must succeed"
        aid = TestArticlesCRUD.created_id
        r = auth_session.put(f"{BASE_URL}/api/articles/{aid}", json={"title": "TEST_Updated_Title", "featured": False})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["title"] == "TEST_Updated_Title"
        assert data["featured"] is False

        # Persistence verify
        g = requests.get(f"{BASE_URL}/api/articles/{aid}")
        assert g.status_code == 200
        assert g.json()["title"] == "TEST_Updated_Title"

    def test_delete_article(self, auth_session):
        assert TestArticlesCRUD.created_id, "Prior create must succeed"
        aid = TestArticlesCRUD.created_id
        r = auth_session.delete(f"{BASE_URL}/api/articles/{aid}")
        assert r.status_code == 200, r.text

        g = requests.get(f"{BASE_URL}/api/articles/{aid}")
        assert g.status_code == 404


# ─── BRUTE FORCE ──────────────────────────────────────
class TestBruteForce:
    def test_five_failed_logins_returns_429(self):
        # Use a unique fake email so we don't lock the real admin account
        fake_email = f"bruteforce_{uuid.uuid4().hex[:6]}@example.com"
        last_status = None
        for i in range(6):
            r = requests.post(f"{BASE_URL}/api/auth/login",
                              json={"email": fake_email, "password": "wrongpass"})
            last_status = r.status_code
            if r.status_code == 429:
                break
        # After 5 failed attempts the 6th attempt should return 429
        assert last_status == 429, f"Expected 429 after 5 failures, last got {last_status}"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
