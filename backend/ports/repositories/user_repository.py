import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.user import User
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()
mongo_user = getenv("MONGO_DB_USER")
mongo_password = getenv("MONGO_DB_PASSWORD")
mongo_uri = (
    f"mongodb+srv://{mongo_user}:{mongo_password}"
    "@cluster0.psyf5un.mongodb.net/"
    "?retryWrites=true&w=majority&appName=Cluster0"
)


class UserRepository:
    def __init__(self) -> None:
        try:
            client = AsyncIOMotorClient(mongo_uri)
            self.db = client.ExperienceApp

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def get(self, **filters) -> User | None:
        try:
            id = filters.get("id")
            o_id = ObjectId(id)
            user = await self.db.Users.find_one({"_id": o_id})
            user["_id"] = str(user["_id"])
            return user

        except Exception as e:
            logging.error(f"UserRepository.get failed with exception: {e}")
            return None
