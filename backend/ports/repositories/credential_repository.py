import logging
from os import getenv

import pymongo.errors
from bson import ObjectId
from domain.entities.credential import Credential
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


class CredentialRepository:
    def __init__(self) -> None:
        try:
            client = AsyncIOMotorClient(mongo_uri)
            self.credentials_collection = client.ExperienceApp.Credentials

        except pymongo.errors.ConnectionFailure as error:
            logging.error(f"Could not connect to database: {error}")

    async def post(self, credential: Credential):
        try:
            data = credential.model_dump()
            data["_id"] = ObjectId(credential.id)
            data.pop("id", None)
            result = await self.credentials_collection.insert_one(data)
            return {"id": str(result.inserted_id)}

        except Exception as e:
            logging.error(f"CredentialRepository.post failed: {e}")
            raise HTTPException(status_code=400, detail="Bad request: " + str(e))
