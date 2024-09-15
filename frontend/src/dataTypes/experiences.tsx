import { DateTime } from "luxon"

type Experience = {
    id: number,
    activity: string,
    location: string,
    peopleNeeded: number,
    peopleReserved: number,
    description: string,
    ownerId: number,
    start: DateTime,
    end: DateTime,
    image?: string 

}

//Filtering is not used or surfaced in frontend logic

export type { Experience }