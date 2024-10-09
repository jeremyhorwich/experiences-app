type User = {
    id: string,
    name: string,
    age: number,
    gender: "male" | "female" | "nonbinary",
    communicationPreference: "text" | "email",
    communicationAddress: number | string,
    rating: number
}

type Credential = {
    username: string,
    password: string
}

export type { User, Credential }

//Rating history (granular by experience) will not  be used or surfaced in frontend logic
