from domain.entities.credential import Credential
from pydantic import BaseModel


class PostCredentialRequest(BaseModel):
    credential: Credential
