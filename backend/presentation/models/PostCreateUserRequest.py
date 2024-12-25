from domain.entities.credential import Credential
from domain.entities.user import User
from pydantic import BaseModel


class PostCreateUserRequest(BaseModel):
    credential: Credential
    user: User
