from domain.entities.message import Message
from ports.repositories.message_repository import MessageRepository


class MessageService:
    def __init__(self) -> None:
        self.message_repository = MessageRepository()

    async def get(self, message_id) -> Message | None:
        message = await self.message_repository.get(id=message_id)
        return message
