"""
EGMG Corporate Website - Backend API Tests
Tests for contact form API endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoint:
    """Health check and root endpoint tests"""
    
    def test_api_root_returns_success(self):
        """Test GET /api/ returns success message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "EGMG API Running"
        print("PASS: API root endpoint returns success")


class TestContactFormAPI:
    """Contact form submission tests"""
    
    def test_contact_form_valid_submission(self):
        """Test POST /api/contact with valid data"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "full_name": f"TEST_User_{unique_id}",
            "company": "Test Company",
            "email": f"test_{unique_id}@example.com",
            "phone": "+971501234567",
            "enquiry_type": "General Enquiry",
            "message": "This is a test message for EGMG contact form."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        assert data["full_name"] == payload["full_name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["enquiry_type"] == payload["enquiry_type"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        print(f"PASS: Contact form submission successful, ID: {data['id']}")
        return data["id"]
    
    def test_contact_form_without_company(self):
        """Test POST /api/contact without optional company field"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "full_name": f"TEST_NoCompany_{unique_id}",
            "email": f"nocompany_{unique_id}@example.com",
            "phone": "+971509876543",
            "enquiry_type": "Car Rental",
            "message": "Testing contact form without company field."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["full_name"] == payload["full_name"]
        assert data["company"] == ""  # Default empty string
        print("PASS: Contact form works without company field")
    
    def test_contact_form_missing_required_fields(self):
        """Test POST /api/contact with missing required fields returns 422"""
        payload = {
            "full_name": "Test User"
            # Missing email, phone, enquiry_type, message
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 422, f"Expected 422 for missing fields, got {response.status_code}"
        print("PASS: Backend correctly rejects missing required fields with 422")
    
    def test_contact_form_invalid_email_format(self):
        """Test POST /api/contact with invalid email format"""
        payload = {
            "full_name": "Test User",
            "email": "invalid-email-format",  # Invalid email
            "phone": "+971501234567",
            "enquiry_type": "General Enquiry",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("PASS: Backend correctly rejects invalid email format with 422")
    
    def test_contact_form_empty_message(self):
        """Test POST /api/contact with empty message"""
        payload = {
            "full_name": "Test User",
            "email": "test@example.com",
            "phone": "+971501234567",
            "enquiry_type": "General Enquiry",
            "message": ""  # Empty message
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 422, f"Expected 422 for empty message, got {response.status_code}"
        print("PASS: Backend correctly rejects empty message with 422")


class TestContactsListAPI:
    """Tests for retrieving contact submissions"""
    
    def test_get_contacts_list(self):
        """Test GET /api/contacts returns list of submissions"""
        response = requests.get(f"{BASE_URL}/api/contacts")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"PASS: GET /api/contacts returns list with {len(data)} items")
    
    def test_get_contacts_with_pagination(self):
        """Test GET /api/contacts with skip and limit parameters"""
        response = requests.get(f"{BASE_URL}/api/contacts?skip=0&limit=5")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) <= 5, "Should respect limit parameter"
        print(f"PASS: Pagination works, returned {len(data)} items with limit=5")
    
    def test_contact_persistence(self):
        """Test that submitted contact is persisted and retrievable"""
        # Create a unique contact
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "full_name": f"TEST_Persist_{unique_id}",
            "company": "Persistence Test Co",
            "email": f"persist_{unique_id}@example.com",
            "phone": "+971507777777",
            "enquiry_type": "Fleet Leasing",
            "message": "Testing data persistence in MongoDB."
        }
        
        # Submit contact
        create_response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert create_response.status_code == 200
        created_data = create_response.json()
        created_id = created_data["id"]
        
        # Verify it appears in the list
        list_response = requests.get(f"{BASE_URL}/api/contacts?limit=100")
        assert list_response.status_code == 200
        contacts = list_response.json()
        
        # Find our created contact
        found = False
        for contact in contacts:
            if contact.get("id") == created_id:
                found = True
                assert contact["full_name"] == payload["full_name"]
                assert contact["email"] == payload["email"]
                break
        
        assert found, f"Created contact with ID {created_id} not found in list"
        print(f"PASS: Contact {created_id} persisted and retrievable")


class TestEnquiryTypes:
    """Test different enquiry types"""
    
    @pytest.mark.parametrize("enquiry_type", [
        "General Enquiry",
        "Car Rental",
        "Vehicle Leasing",
        "Chauffeur Service",
        "Corporate Fleet",
        "Used Cars",
        "Other"
    ])
    def test_various_enquiry_types(self, enquiry_type):
        """Test contact form accepts various enquiry types"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "full_name": f"TEST_Enquiry_{unique_id}",
            "email": f"enquiry_{unique_id}@example.com",
            "phone": "+971508888888",
            "enquiry_type": enquiry_type,
            "message": f"Testing {enquiry_type} submission."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["enquiry_type"] == enquiry_type
        print(f"PASS: Enquiry type '{enquiry_type}' accepted")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
