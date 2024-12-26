from pydantic import BaseModel


class PostLoginRequest(BaseModel):
    username: str
    password: str
