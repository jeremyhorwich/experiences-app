import logging
from os import getenv

import pymongo.errors
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
            user = await self.users_collection.find_one({"_id": id})
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
                {"_id": {"$in": [m_id for m_id in ids]}}
            )
            fetched = await cursor.to_list(length=None)
            return fetched

        except Exception as e:
            logging.error(f"UserRepository.get_multiple failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def post(self, user: User):
        try:
            data = user.model_dump()
            data["_id"] = user.id
            data.pop("id", None)
            result = await self.users_collection.insert_one(data)
            return {"id": str(result.inserted_id)}

        except Exception as e:
            logging.error(f"UserRepository.post failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))

    async def update_rating(self, id, increment_value) -> str | None:
        MIN_BOUND = 0
        MAX_BOUND = 200

        try:
            user = await self.users_collection.find_one({"_id": id})

            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            current_rating = user.get("rating", 0)
            new_rating = min(
                max(current_rating + increment_value, MIN_BOUND), MAX_BOUND
            )

            result = await self.users_collection.update_one(
                {"_id": id}, {"$set": {"rating": new_rating}}
            )

            if result.modified_count == 0:
                logging.warning(f"Rating update not applied for user: {id}")
                return "No changes applied"

            return f"Rating updated succesfully for {id}"

        except HTTPException:
            raise

        except Exception as e:
            logging.error(f"UserRepository.get_multiple failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))
