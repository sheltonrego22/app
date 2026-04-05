import requests
import sys
from datetime import datetime
import json

class EGMGAPITester:
    def __init__(self, base_url="https://egmg-premium.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_preview": response.text[:200] if not success else "OK"
            })

            return success, response.json() if success and response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_preview": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "full_name": "John Smith",
            "company": "Test Company Ltd",
            "email": "john.smith@testcompany.com",
            "phone": "+971 50 123 4567",
            "enquiry_type": "Car Rental",
            "message": "I would like to inquire about car rental options for a week-long business trip to Dubai."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        
        if success:
            # Verify response contains expected fields
            required_fields = ["id", "full_name", "email", "phone", "enquiry_type", "message", "created_at"]
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False
            print(f"✅ Contact submission created with ID: {response.get('id', 'N/A')}")
        
        return success

    def test_get_contacts(self):
        """Test retrieving contacts (if endpoint exists)"""
        success, response = self.run_test(
            "Get Contacts",
            "GET",
            "api/contacts",
            200
        )
        
        if success:
            print(f"✅ Retrieved {len(response)} contact submissions")
        
        return success

    def test_invalid_contact_submission(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "full_name": "",  # Empty required field
            "email": "invalid-email",  # Invalid email format
            "phone": "",  # Empty required field
            "enquiry_type": "",  # Empty required field
            "message": ""  # Empty required field
        }
        
        success, response = self.run_test(
            "Invalid Contact Submission",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=invalid_data
        )
        return success

def main():
    print("🚀 Starting EGMG API Testing...")
    print("=" * 50)
    
    # Setup
    tester = EGMGAPITester()
    
    # Run tests
    print("\n📋 Running Backend API Tests...")
    
    # Test 1: API Root
    tester.test_api_root()
    
    # Test 2: Valid Contact Submission
    tester.test_contact_submission()
    
    # Test 3: Get Contacts (if available)
    tester.test_get_contacts()
    
    # Test 4: Invalid Contact Submission
    tester.test_invalid_contact_submission()
    
    # Print results summary
    print("\n" + "=" * 50)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print detailed results
    print(f"\n📋 Detailed Results:")
    for result in tester.test_results:
        status = "✅ PASS" if result["success"] else "❌ FAIL"
        print(f"   {status} - {result['name']} ({result['method']} {result['endpoint']})")
        if not result["success"]:
            print(f"      Expected: {result['expected_status']}, Got: {result['actual_status']}")
            print(f"      Error: {result['response_preview']}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())