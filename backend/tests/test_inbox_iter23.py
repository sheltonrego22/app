"""Tests for enquiries inbox (contacts & bookings) endpoints - Iteration 23"""
import os
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://egmg-premium.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@egmg.ae"
ADMIN_PASSWORD = "EgmgAdmin2026!"

# Mongo cleanup
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"


@pytest.fixture(scope="module")
def auth_session():
    s = requests.Session()
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return s


@pytest.fixture(scope="module")
def auth_headers(auth_session):
    # For tests expecting header interface, return cookies dict via session cookies
    token = auth_session.cookies.get("access_token")
    return {"Authorization": f"Bearer {token}"} if token else {}


@pytest.fixture(scope="module", autouse=True)
def cleanup():
    yield
    client = MongoClient(MONGO_URL)
    db = client[DB_NAME]
    db.contact_submissions.delete_many({"full_name": {"$regex": "^TEST_"}})
    db.bookings.delete_many({"name": {"$regex": "^TEST_"}})
    client.close()


class TestContactsInbox:
    def test_create_contact_public(self):
        r = requests.post(f"{API}/contact", json={
            "full_name": "TEST_ Iter23 Contact",
            "company": "TEST",
            "email": "qa+contact@test.ae",
            "phone": "+971500000000",
            "enquiry_type": "chauffeur",
            "message": "TEST_ enquiry from iter23"
        })
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "new"
        assert data["full_name"].startswith("TEST_")
        pytest.contact_id = data["id"]

    def test_get_contacts_unauth(self):
        r = requests.get(f"{API}/contacts")
        assert r.status_code == 401

    def test_get_contacts_returns_new_first(self, auth_headers):
        r = requests.get(f"{API}/contacts", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert len(items) > 0
        # Newest first
        assert items[0]["id"] == pytest.contact_id
        assert items[0]["status"] == "new"

    def test_patch_contact_status_unauth(self):
        r = requests.patch(f"{API}/contacts/{pytest.contact_id}/status", json={"status": "contacted"})
        assert r.status_code == 401

    def test_patch_contact_status_to_contacted(self, auth_headers):
        r = requests.patch(f"{API}/contacts/{pytest.contact_id}/status", json={"status": "contacted"}, headers=auth_headers)
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == pytest.contact_id
        assert data["status"] == "contacted"

    def test_get_contacts_filter_contacted(self, auth_headers):
        r = requests.get(f"{API}/contacts?status=contacted", headers=auth_headers)
        assert r.status_code == 200
        ids = [c["id"] for c in r.json()]
        assert pytest.contact_id in ids

    def test_patch_contact_invalid_status(self, auth_headers):
        r = requests.patch(f"{API}/contacts/{pytest.contact_id}/status", json={"status": "bogus"}, headers=auth_headers)
        assert r.status_code == 422

    def test_patch_contact_unknown_id(self, auth_headers):
        r = requests.patch(f"{API}/contacts/nonexistent-id/status", json={"status": "contacted"}, headers=auth_headers)
        assert r.status_code == 404


class TestBookingsInbox:
    def test_create_booking_public(self):
        r = requests.post(f"{API}/bookings", json={
            "duration": "4h",
            "date": "2026-10-01",
            "time": "09:00",
            "pickup_type": "airport",
            "pickup_location": "DXB T3",
            "dropoff_type": "location",
            "dropoff_location": "Marina",
            "passengers": "3",
            "vehicle": "Lexus ES 350",
            "price": 850,
            "name": "TEST_ QA Iter23",
            "email": "qa@test.ae",
            "phone": "+971500000000"
        })
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "pending"
        pytest.booking_id = data["id"]

    def test_get_bookings_unauth(self):
        r = requests.get(f"{API}/bookings")
        assert r.status_code == 401

    def test_get_bookings_newest_first(self, auth_headers):
        r = requests.get(f"{API}/bookings", headers=auth_headers)
        assert r.status_code == 200
        items = r.json()
        assert items[0]["id"] == pytest.booking_id
        assert items[0]["status"] == "pending"

    def test_patch_booking_unauth(self):
        r = requests.patch(f"{API}/bookings/{pytest.booking_id}/status", json={"status": "confirmed"})
        assert r.status_code == 401

    def test_patch_booking_to_confirmed(self, auth_headers):
        r = requests.patch(f"{API}/bookings/{pytest.booking_id}/status", json={"status": "confirmed"}, headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["status"] == "confirmed"

    def test_get_bookings_filter_confirmed(self, auth_headers):
        r = requests.get(f"{API}/bookings?status=confirmed", headers=auth_headers)
        assert r.status_code == 200
        ids = [b["id"] for b in r.json()]
        assert pytest.booking_id in ids

    def test_patch_booking_invalid_status(self, auth_headers):
        r = requests.patch(f"{API}/bookings/{pytest.booking_id}/status", json={"status": "bogus"}, headers=auth_headers)
        assert r.status_code == 422

    def test_patch_booking_unknown_id(self, auth_headers):
        r = requests.patch(f"{API}/bookings/nonexistent-id/status", json={"status": "confirmed"}, headers=auth_headers)
        assert r.status_code == 404
