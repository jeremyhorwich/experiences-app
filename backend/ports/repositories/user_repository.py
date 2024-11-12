import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.user import User
from dotenv import load_dotenv
from fastapi import HTTPException
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
            self.users_collection = client.ExperienceApp.Users

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def get(self, **filters) -> User | None:
        try:
            id = filters.get("id")
            o_id = ObjectId(id)
            user = await self.users_collection.find_one({"_id": o_id})
            user["_id"] = str(user["_id"])
            return user

        except Exception as e:
            logging.error(f"UserRepository.get failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def get_multiple(self, **filters) -> list[User] | None:
        try:
            ids = filters.get("ids")

            if not ids:
                return []

            cursor = self.users_collection.find(
                {"_id": {"$in": [ObjectId(m_id) for m_id in ids]}}
            )
            fetched = await cursor.to_list(length=None)

            for user in fetched:
                user["_id"] = str(user["_id"])
            return fetched

        except Exception as e:
            logging.error(f"UserRepository.get_multiple failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))
