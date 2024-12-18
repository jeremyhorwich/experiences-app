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
    min_age: int
    max_age: int
    min_rating: int
    male_included: bool
    female_included: bool
    nonbinary_included: bool
