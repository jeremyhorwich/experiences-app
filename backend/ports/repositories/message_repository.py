import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.message import Message
from dotenv import load_dotenv
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING
from pymongo.errors import PyMongoError

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
            self.messages_collection = client.ExperienceApp.Messages

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def get(self, **filters) -> Message | None:
        try:
            id = filters.get("id")
            o_id = ObjectId(id)
            message = await self.messages_collection.find_one({"_id": o_id})
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

            cursor = self.messages_collection.find(
                {"_id": {"$in": [ObjectId(m_id) for m_id in ids]}}
            )
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

    async def post(self, message: Message):
        try:
            data = message.model_dump()
            data["_id"] = ObjectId(message.id)
            data.pop("id", None)
            result = await self.messages_collection.insert_one(data)
            return {"id": str(result.inserted_id)}

        except PyMongoError as pme:
            logging.error(f"Database operation failed: {pme}")
            raise HTTPException(status_code=500, detail="Database operation fail")

        except Exception as e:
            logging.error(f"MessageRepository.append_message_id failed: {e}")
            raise HTTPException(status_code=500, detail="Internal server error")
