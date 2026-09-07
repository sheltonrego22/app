from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

import os
import pytest
from pymongo import MongoClient


@pytest.fixture(autouse=True)
def _reset_public_form_rate_limits():
    # The suite is one heavy client on a single IP; keep production limits from blocking it.
    client = MongoClient(os.environ["MONGO_URL"])
    client[os.environ["DB_NAME"]].rate_limits.delete_many({})
    client.close()
    yield
