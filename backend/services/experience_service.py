from domain.entities.experience import Experience
from ports.repositories.experience_repository import ExperienceRepository


class ExperienceService:
    def __init__(self) -> None:
        self.experience_repository = ExperienceRepository()

    async def get(self, experience_id) -> Experience | None:
        experience = await self.experience_repository.get(id=experience_id)
        return experience

    async def post(self, experience: Experience) -> Experience | None:
        result = await self.experience_repository.post(experience)
        return result
