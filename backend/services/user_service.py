from domain.entities.user import User
from ports.repositories.user_repository import UserRepository


class UserService:
    def __init__(self) -> None:
        self.user_repository = UserRepository()

    async def get(self, user_id: str) -> User | None:
        user = await self.user_repository.get(id=user_id)
        return user

    async def get_multiple(self, user_ids: list[str]) -> list[User] | None:
        users = await self.user_repository.get_multiple(ids=user_ids)
        return users

    async def update_rating(self, user_id: str, increment_value: int) -> str | None:
        bounded_increment = increment_value
        if increment_value < -1:
            bounded_increment = -1
        if increment_value > 1:
            bounded_increment = 1
        result = await self.user_repository.update_rating(user_id, bounded_increment)
        return result
