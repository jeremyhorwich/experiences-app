import { DateTime } from "luxon"

type Experience = {
    id: string,
    activity: string,
    location: string,
    peopleNeeded: number,
    peopleReserved: Array<string>,
    description: string,
    ownerId: string,
    start: DateTime,
    end: DateTime,
    messages: Array<string>,
    image?: string 
    minAge: number,
    maxAge: number,
    minRating: number,
    maleIncluded: boolean,
    femaleIncluded: boolean,
    nonbinaryIncluded: boolean,
}

export type { Experience }