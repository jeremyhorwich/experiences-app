from datetime import datetime, timedelta

import jwt
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

    def generate_jwt(self, payload: dict) -> str:
        KEY = "Nd9)7"
        EXPIRATION_MINUTES = 60
        expiration_time = datetime.now() + timedelta(minutes=EXPIRATION_MINUTES)
        payload["expiration"] = expiration_time.isoformat()
        token = jwt.encode(payload, KEY, algorithm="HS256")
        return token

    async def create_new(self, credential: Credential):
        try:
            self.validate_password_strength(credential.password)
            hashed = self.pwd_context.hash(credential.password)
            credential.password = hashed
            result = await self.credential_repository.post(credential)
            return result

        except ValueError as e:
            return {"failure": str(e)}

    async def verify_login(self, credential: Credential):
        stored_credential = await self.credential_repository.get(credential.username)
        if not stored_credential:
            return {"failure": "Username or password invalid"}

        password_valid = self.pwd_context.verify(
            credential.password, stored_credential.password
        )
        if not password_valid:
            return {"failure": "Username or password invalid"}

        token = self.generate_jwt({"username": stored_credential.username})
        return {"success": "Login successful", "token": token}
