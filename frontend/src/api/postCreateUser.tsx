import { Credential, User } from "../dataTypes/users";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function postCreateUser(credential: Credential, user: User) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/authentication/signup`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({ credential, user})
                }
            );

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const responseJSON = await response.json();
        return responseJSON
    } catch (error) {
        console.error("Error creating user: ", error);
    }
}

export { postCreateUser }