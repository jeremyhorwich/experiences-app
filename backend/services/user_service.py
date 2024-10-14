from domain.entities.user import User
from ports.repositories.user_repository import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    async def get(self, user_id) -> User | None:
        user = await self.user_repository.get(id=user_id)
        return user
