from pydantic import BaseModel


class Credential(BaseModel):
    id: str
    user: str
    username: str
    password: str
