from typing import Annotated

from domain.entities.experience import Experience
from fastapi import APIRouter, Depends
from presentation.models.PostMessageRequest import PostMessageRequest
from services.experience_service import ExperienceService

router = APIRouter(prefix="/experiences")

experience_service_instance = ExperienceService()


def get_message_service() -> ExperienceService:
    return experience_service_instance


experience_service_dependency = Annotated[
    ExperienceService, Depends(get_message_service)
]


@router.get("/{experience_id}")
async def get_experience(
    experience_id: str, experience_service: experience_service_dependency
):
    experience = await experience_service.get(experience_id)
    return experience


@router.post("/")
async def post_experience(
    experience: Experience, experience_service: experience_service_dependency
):
    result = await experience_service.post(experience)
    if result:
        return result


@router.get("/{experience_id}/messages/")
async def get_messages_by_experience(
    experience_id: str,
    page_number: int,
    page_size: int,
    experience_service: experience_service_dependency,
):
    result = await experience_service.get_messages_paginated(
        experience_id, page_number, page_size
    )
    if result:
        return result


@router.post("/{experience_id}/messages/")
async def post_new_message_to_experience(
    experience_id: str,
    request: PostMessageRequest,
    experience_service: experience_service_dependency,
):
    result = await experience_service.add_new_message(
        experience_id, request.new_message
    )

    return result
