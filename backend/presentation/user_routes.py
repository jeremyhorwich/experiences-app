from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from services.user_service import UserService

router = APIRouter(prefix="/users")

user_service_instance = UserService()


def get_message_service() -> UserService:
    return user_service_instance


user_service_dependency = Annotated[UserService, Depends(get_message_service)]


class UserIdsRequest(BaseModel):
    user_ids: list[str]


@router.get("/{user_id}")
async def get_user(user_id: str, user_service: user_service_dependency):
    user = await user_service.get(user_id)
    return user


@router.post("/")
async def get_multiple_users(
    request: UserIdsRequest, user_service: user_service_dependency
):
    users = await user_service.get_multiple(request.user_ids)
    return users
