from domain.entities.experience import Experience
from domain.entities.message import Message
from ports.repositories.experience_repository import ExperienceRepository
from ports.repositories.message_repository import MessageRepository


class ExperienceService:
    def __init__(self) -> None:
        self.experience_repository = ExperienceRepository()
        self.message_repository = MessageRepository()

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
        result = await self.message_repository.get_multiple(
            ids=message_ids, page=page_number, page_size=page_size
        )
        if result:
            return result
        return []

    async def add_new_message(
        self, experience_id: str, new_message: Message
    ) -> str | None:
        message_post_result = await self.message_repository.post(new_message)

        if not message_post_result:
            return None

        inserted_id = message_post_result["id"]
        await self.experience_repository.append_message_id(experience_id, inserted_id)

        return message_post_result
