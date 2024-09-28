import { DateTime } from "luxon"

type Experience = {
    id: string,
    activity: string,
    location: string,
    peopleNeeded: number,
    peopleReserved: Array<number>,
    description: string,
    ownerId: number,
    start: DateTime,
    end: DateTime,
    messages: Array<string>,
    image?: string 
}

//Filtering is not used or surfaced in frontend logic

export type { Experience }