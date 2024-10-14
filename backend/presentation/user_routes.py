from fastapi import APIRouter
from services.user_service import UserService

router = APIRouter(prefix="/users")


@router.get("/{user_id}")
async def get_user(user_id: str):
    service = UserService()
    user = await service.get(user_id)
    return user
