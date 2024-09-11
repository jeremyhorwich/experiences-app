import { User } from "./user";

type Experience = {
    activity: string,
    location: string,
    peopleNeeded: number,
    peopleReserved: number,
    description: string,
    owner: User,
    schedule: Array<Date>
}

//Filtering is not used or surfaced in frontend logic

export type { Experience }