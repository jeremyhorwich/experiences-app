type User = {
    age: number,
    gender: "male" | "female" | "nonbinary",
    communicationPreference: "text" | "email",
    communicationAddress: number | string,
    rating: number
}

export type { User }

//Rating history (granular by experience) will not  be used or surfaced in frontend logic