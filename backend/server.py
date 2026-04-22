from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, UploadFile, File, Form
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import bcrypt
import jwt
import uuid
import secrets
import shutil
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# ══════════════════ PASSWORD HELPERS ══════════════════

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

# ══════════════════ JWT HELPERS ══════════════════

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=4), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ══════════════════ PYDANTIC MODELS ══════════════════

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

class LoginInput(BaseModel):
    email: str
    password: str

class ArticleCreate(BaseModel):
    title: str = Field(min_length=1, max_length=500)
    body: str = Field(default="")
    category: str = Field(min_length=1)
    image_url: Optional[str] = ""
    video_url: Optional[str] = ""
    pdf_url: Optional[str] = ""
    featured: bool = False
    published: bool = True

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    pdf_url: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None

# ══════════════════ AUTH ENDPOINTS ══════════════════

@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request):
    email = input.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"

    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= 5:
        locked_until = attempt.get("locked_until")
        if locked_until and datetime.now(timezone.utc) < locked_until:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        else:
            await db.login_attempts.delete_one({"identifier": identifier})

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})

    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)

    response = JSONResponse(content={
        "id": user_id,
        "email": user["email"],
        "name": user.get("name", ""),
        "role": user.get("role", "admin"),
    })
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=14400, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return response

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {"id": user["_id"], "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "admin")}

@api_router.post("/auth/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return response

@api_router.post("/auth/refresh")
async def refresh_token(request: Request):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        new_access = create_access_token(str(user["_id"]), user["email"])
        response = JSONResponse(content={"message": "Token refreshed"})
        response.set_cookie(key="access_token", value=new_access, httponly=True, secure=False, samesite="lax", max_age=14400, path="/")
        return response
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# ══════════════════ CONTACT + BOOKING ══════════════════

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

# ══════════════════ FILE UPLOAD ══════════════════

@api_router.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(...)):
    await get_current_user(request)
    ext = Path(file.filename).suffix.lower()
    allowed = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf", ".doc", ".docx"}
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = UPLOAD_DIR / filename
    with open(filepath, "wb") as f:
        shutil.copyfileobj(file.file, f)
    url = f"/api/uploads/{filename}"
    return {"url": url, "filename": filename}

from fastapi.staticfiles import StaticFiles

# ══════════════════ ARTICLES CMS ══════════════════

@api_router.get("/articles")
async def get_articles(category: Optional[str] = None, search: Optional[str] = None, featured: Optional[bool] = None, skip: int = 0, limit: int = 50):
    query = {}
    if category and category != "All":
        query["category"] = category
    if search:
        query["title"] = {"$regex": search, "$options": "i"}
    if featured is not None:
        query["featured"] = featured
    articles = await db.articles.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(min(limit, 200)).to_list(None)
    total = await db.articles.count_documents(query)
    return {"articles": articles, "total": total}

@api_router.get("/articles/{article_id}")
async def get_article(article_id: str):
    article = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@api_router.post("/articles")
async def create_article(input: ArticleCreate, request: Request):
    await get_current_user(request)
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": str(uuid.uuid4()),
        **input.model_dump(),
        "created_at": now,
        "updated_at": now,
    }
    await db.articles.insert_one(doc)
    created = await db.articles.find_one({"id": doc["id"]}, {"_id": 0})
    return created

@api_router.put("/articles/{article_id}")
async def update_article(article_id: str, input: ArticleUpdate, request: Request):
    await get_current_user(request)
    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.articles.update_one({"id": article_id}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    updated = await db.articles.find_one({"id": article_id}, {"_id": 0})
    return updated

@api_router.delete("/articles/{article_id}")
async def delete_article(article_id: str, request: Request):
    await get_current_user(request)
    result = await db.articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted"}

# ══════════════════ SETUP ══════════════════

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# ══════════════════ STARTUP ══════════════════

@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.articles.create_index("category")
    await db.articles.create_index("created_at")
    await db.login_attempts.create_index("identifier")

    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@egmg.ae").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "EgmgAdmin2026!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({"email": admin_email, "password_hash": hashed, "name": "EGMG Admin", "role": "admin", "created_at": datetime.now(timezone.utc)})
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated from .env")

    # Seed sample articles if empty
    count = await db.articles.count_documents({})
    if count == 0:
        sample_articles = [
            {"title": "EGMG Receives World Travel Award for Best Car Rental MENA 2024", "body": "<p>Eurogulf Mobility Group has been recognised with the World Travel Award for Best Car Rental Company in the Middle East and North Africa for 2024, extending its winning streak that began in 2005.</p><p>This prestigious accolade reflects our unwavering commitment to delivering exceptional mobility solutions across the UAE and beyond.</p>", "category": "Awards", "featured": True, "published": True},
            {"title": "Driving the Future: EGMG's Commitment to Green Mobility in the UAE", "body": "<p>As part of our sustainability roadmap, EGMG is expanding its electric and hybrid vehicle fleet across all divisions. Our commitment to the UAE's Net Zero 2050 strategy drives every decision we make.</p>", "category": "Sustainability", "featured": True, "published": True},
            {"title": "Royal Limousine Expands Executive Fleet with New BMW 7 Series and Audi A8", "body": "<p>Royal Limousine has added the latest BMW 7 Series and Audi A8 models to its executive chauffeur fleet, reinforcing our position as the UAE's premier luxury transportation provider.</p>", "category": "Fleet", "featured": False, "published": True},
            {"title": "EGMG Celebrates 50 Years of Moving the UAE Forward", "body": "<p>Since 1976, Eurogulf Mobility Group has been at the forefront of the UAE's mobility landscape. From our first Europcar franchise to managing over 12,000 vehicles across 14 locations, our journey reflects the growth and ambition of the nation we serve.</p>", "category": "Company Updates", "featured": True, "published": True},
            {"title": "Truckline Launches Chiller Unit Fleet for Food Logistics", "body": "<p>Truckline Transport has introduced a specialised fleet of temperature-controlled vehicles to support the UAE's growing food delivery and cold-chain logistics sector.</p>", "category": "Fleet", "featured": False, "published": True},
            {"title": "Europcar Dubai Opens New Location at Dubai Hills Mall", "body": "<p>Europcar Dubai has expanded its network with a new outlet at Dubai Hills Mall, bringing our total UAE locations to 14 and providing even greater convenience for residents and visitors.</p>", "category": "Press Releases", "featured": False, "published": True},
            {"title": "EGMG Achieves ISO 45001:2018 Occupational Health & Safety Certification", "body": "<p>EGMG has earned the ISO 45001:2018 certification, demonstrating our commitment to creating a safe working environment for our 1,200+ employees across the UAE.</p>", "category": "Company Updates", "featured": False, "published": True},
            {"title": "The Future of Corporate Transportation in the UAE", "body": "<p>As the UAE positions itself as a global business hub, the demand for reliable, premium corporate transportation continues to rise. EGMG is leading this transformation with innovative fleet management and chauffeur solutions.</p>", "category": "Industry News", "featured": False, "published": True},
            {"title": "Goldcar UAE: Smart Travel for the Budget-Conscious Explorer", "body": "<p>Goldcar continues to redefine value car rental in the UAE, offering competitive rates without compromising on vehicle quality or customer service. Available at all Europcar outlets and exclusively at Sharjah International Airport.</p>", "category": "Press Releases", "featured": False, "published": True},
            {"title": "Emirates Taxi Earns Top RTA Safety Rating", "body": "<p>Emirates Taxi has received the highest safety rating from Dubai's Roads and Transport Authority, recognising our fleet's compliance with the strictest safety standards and our drivers' exceptional performance scores.</p>", "category": "Awards", "featured": False, "published": True},
        ]
        now = datetime.now(timezone.utc)
        for i, a in enumerate(sample_articles):
            a["id"] = str(uuid.uuid4())
            a["image_url"] = ""
            a["video_url"] = ""
            a["pdf_url"] = ""
            a["created_at"] = (now - timedelta(days=i * 3)).isoformat()
            a["updated_at"] = a["created_at"]
        await db.articles.insert_many(sample_articles)
        logger.info(f"Seeded {len(sample_articles)} sample articles")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
