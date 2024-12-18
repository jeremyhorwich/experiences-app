from typing import Annotated

from fastapi import APIRouter, Depends
from presentation.models.UpdateRatingRequest import UpdateRatingRequest
from pydantic import BaseModel
from services.user_service import UserService

router = APIRouter(prefix="/users")

user_service_instance = UserService()


def get_user_service() -> UserService:
    return user_service_instance


user_service_dependency = Annotated[UserService, Depends(get_user_service)]


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


@router.put("/{user_id}/update-rating/")
async def update_rating(
    user_id: str, request: UpdateRatingRequest, user_service: user_service_dependency
):
    result = await user_service.update_rating(user_id, request.increment_value)
    return result


@router.get("/{user_id}/experiences/")
async def get_applicable_experiences(
    user_service: user_service_dependency,
    user_id: str,
    page: int = 1,
    pageSize: int = 10,
):
    result = await user_service.get_applicable_experiences(user_id, page, pageSize)
    return result
