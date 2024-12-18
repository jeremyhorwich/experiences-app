from domain.entities.credential import Credential
from passlib.context import CryptContext
from ports.repositories.credential_repository import CredentialRepository


class AuthenticationService:
    def __init__(self) -> None:
        self.credential_repository = CredentialRepository()
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def validate_password_strength(self, password: str) -> bool:
        MIN_LENGTH = 8
        if len(password) < MIN_LENGTH:
            raise ValueError(f"Password must be at least {MIN_LENGTH} characters long")
        if not any(char.isdigit() for char in password):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isalpha() for char in password):
            raise ValueError("Password must contain at least one letter")
        return True

    async def create_new(self, credential: Credential):
        try:
            self.validate_password_strength(credential.password)
            hashed = self.pwd_context.hash(credential.password)
            credential.password = hashed
            result = await self.credential_repository.post(credential)
            return result

        except ValueError as e:
            return {"failure": str(e)}
