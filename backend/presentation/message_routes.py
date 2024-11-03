from typing import Annotated

from fastapi import APIRouter, Depends
from services.message_service import MessageService

router = APIRouter(prefix="/messages")

message_service_instance = MessageService()


def get_message_service() -> MessageService:
    return message_service_instance


message_service_dependency = Annotated[MessageService, Depends(get_message_service)]


@router.get("/{message_id}")
async def get_message(message_id: str, message_service: message_service_dependency):
    message = await message_service.get(message_id)
    return message
