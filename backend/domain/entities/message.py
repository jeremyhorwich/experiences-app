from datetime import datetime

from pydantic import BaseModel


class Message(BaseModel):
    id: str
    text: str
    sender: str
    senderName: str
    timeSent: datetime
