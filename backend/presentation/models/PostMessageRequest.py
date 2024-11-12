from domain.entities.message import Message
from pydantic import BaseModel


class PostMessageRequest(BaseModel):
    new_message: Message
