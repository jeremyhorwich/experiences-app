from domain.entities.experience import Experience
from fastapi import APIRouter
from services.experience_service import ExperienceService

router = APIRouter(prefix="/experiences")


@router.get("/{experience_id}")
async def get_experience(experience_id: str):
    service = ExperienceService()
    experience = await service.get(experience_id)
    return experience


@router.post("/post/")
async def post_experience(experience: Experience):
    service = ExperienceService()
    result = await service.post(experience)
    if result:
        return result
