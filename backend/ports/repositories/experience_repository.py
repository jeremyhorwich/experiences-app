import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.experience import Experience
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


class ExperienceRepository:
    def __init__(self) -> None:
        try:
            client = AsyncIOMotorClient(mongo_uri)
            self.db = client.ExperienceApp.Experiences

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def get(self, **filters) -> Experience | None:
        try:
            id = filters.get("id")
            o_id = ObjectId(id)
            experience = await self.db.find_one({"_id": o_id})
            experience["_id"] = str(experience["_id"])
            return experience

        except Exception as e:
            logging.error(f"ExperienceRepository.get failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def post(self, experience: Experience):
        try:
            data = experience.model_dump()
            data["_id"] = ObjectId(experience.id)
            data.pop("id", None)
            result = await self.db.insert_one(data)
            return {"id": str(result.inserted_id)}

        except Exception as e:
            logging.error(f"ExperienceRepository.post failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def get_message_ids(
        self,
        experience_id: str,
    ) -> list[str]:
        try:
            experience = await self.get(id=experience_id)
            if experience is not None:
                message_ids = experience["messages"]
                return message_ids
            return []

        except Exception as e:
            logging.error(f"ExperienceRepository.get_message_ids failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))
