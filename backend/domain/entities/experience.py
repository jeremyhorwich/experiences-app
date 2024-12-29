from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Experience(BaseModel):
    id: str
    activity: str
    location: str
    peopleNeeded: int
    peopleReserved: list[str]
    description: str
    ownerId: str
    start: datetime
    end: datetime
    messages: list[str]
    image: Optional[str]
    minAge: int
    maxAge: int
    minRating: int
    maleIncluded: bool
    femaleIncluded: bool
    nonbinaryIncluded: bool
