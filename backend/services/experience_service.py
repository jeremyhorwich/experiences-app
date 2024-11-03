from domain.entities.experience import Experience
from domain.entities.message import Message
from ports.repositories.experience_repository import ExperienceRepository
from ports.repositories.message_repository import MessageRepository


class ExperienceService:
    def __init__(self) -> None:
        self.experience_repository = ExperienceRepository()

    async def get(self, experience_id: str) -> Experience | None:
        experience = await self.experience_repository.get(id=experience_id)
        return experience

    async def post(self, experience: Experience) -> Experience | None:
        result = await self.experience_repository.post(experience)
        return result

    async def get_messages_paginated(
        self, experience_id: str, page_number: int, page_size: int
    ) -> list[Message]:
        message_ids = await self.experience_repository.get_message_ids(experience_id)
        message_repository = MessageRepository()
        result = await message_repository.get_multiple(
            ids=message_ids, page=page_number, page_size=page_size
        )
        if result:
            return result
        return []
