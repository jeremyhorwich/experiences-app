import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.message import Message
from dotenv import load_dotenv
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING

load_dotenv()
mongo_user = getenv("MONGO_DB_USER")
mongo_password = getenv("MONGO_DB_PASSWORD")
mongo_uri = (
    f"mongodb+srv://{mongo_user}:{mongo_password}"
    "@cluster0.psyf5un.mongodb.net/"
    "?retryWrites=true&w=majority&appName=Cluster0"
)


class MessageRepository:
    def __init__(self) -> None:
        try:
            client = AsyncIOMotorClient(mongo_uri)
            self.db = client.ExperienceApp.Messages

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def get(self, **filters) -> Message | None:
        try:
            id = filters.get("id")
            o_id = ObjectId(id)
            message = await self.db.find_one({"_id": o_id})
            message["_id"] = str(message["_id"])
            return message

        except Exception as e:
            logging.error(f"MessageRepository.get failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def get_multiple(self, **filters) -> list[Message] | None:
        try:
            ids = filters.get("ids")
            page = filters.get("page", 1)
            page_size = filters.get("page_size", 10)

            if not ids:
                return []

            cursor = self.db.find({"_id": {"$in": [ObjectId(m_id) for m_id in ids]}})
            paginated = (
                await cursor.sort("created_at", DESCENDING)
                .skip(page)
                .limit(page_size)
                .to_list(length=page_size)
            )
            for message in paginated:
                message["_id"] = str(message["_id"])
            return paginated

        except Exception as e:
            logging.error(f"MessageRepository.get_multiple failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))
