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
    id: string,
    user: string,
    username: string,
    password: string
}

export type { User, Credential }