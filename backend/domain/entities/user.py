from typing import Literal, Union

from pydantic import BaseModel


class User(BaseModel):
    id: str
    name: str
    age: int
    gender: Literal["male", "female", "nonbinary"]
    communicationPreference: Literal["text", "email"]
    communicationAddress: Union[str, int]
    rating: int
