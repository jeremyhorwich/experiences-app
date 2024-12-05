from pydantic import BaseModel


class UpdateRatingRequest(BaseModel):
    increment_value: int
