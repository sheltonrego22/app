from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    company: Optional[str] = ""
    email: str
    phone: str
    enquiry_type: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=200)
    company: Optional[str] = ""
    email: str = Field(min_length=1, pattern=r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    phone: str = Field(min_length=1, max_length=30)
    enquiry_type: str = Field(min_length=1)
    message: str = Field(min_length=1, max_length=5000)

class BookingSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reference: str = Field(default_factory=lambda: f"RL-{str(uuid.uuid4().int)[:6]}")
    duration: str
    date: str
    time: str
    pickup_type: str
    pickup_location: str
    dropoff_type: str
    dropoff_location: str
    passengers: str
    vehicle: str
    price: int
    name: str
    email: str
    phone: str
    notes: Optional[str] = ""
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BookingCreate(BaseModel):
    duration: str = Field(pattern=r'^(4h|8h)$')
    date: str = Field(min_length=1)
    time: str = Field(min_length=1)
    pickup_type: str = Field(pattern=r'^(airport|location)$')
    pickup_location: str = Field(min_length=1, max_length=500)
    dropoff_type: str = Field(pattern=r'^(airport|location)$')
    dropoff_location: str = Field(min_length=1, max_length=500)
    passengers: str = Field(pattern=r'^(3|4|6)$')
    vehicle: str = Field(min_length=1, max_length=200)
    price: int = Field(gt=0)
    name: str = Field(min_length=1, max_length=200)
    email: str = Field(min_length=1, pattern=r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    phone: str = Field(min_length=1, max_length=30)
    notes: Optional[str] = ""

@api_router.get("/")
async def root():
    return {"message": "EGMG API Running"}

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(input: ContactCreate):
    submission = ContactSubmission(**input.model_dump())
    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)
    return submission

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts(skip: int = 0, limit: int = 100):
    contacts = await db.contact_submissions.find({}, {"_id": 0}).skip(skip).limit(min(limit, 1000)).to_list(None)
    return contacts

@api_router.post("/bookings", response_model=BookingSubmission)
async def create_booking(input: BookingCreate):
    submission = BookingSubmission(**input.model_dump())
    doc = submission.model_dump()
    await db.bookings.insert_one(doc)
    return submission

@api_router.get("/bookings", response_model=List[BookingSubmission])
async def get_bookings(skip: int = 0, limit: int = 100):
    bookings = await db.bookings.find({}, {"_id": 0}).skip(skip).limit(min(limit, 1000)).to_list(None)
    return bookings

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
