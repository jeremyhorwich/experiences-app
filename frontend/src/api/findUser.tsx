import { User } from "../dataTypes/users";
import { fetchWithErrorHandling } from "./utils/apiRequestHelper";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function findUser(userId: string) {
    const url = `${backendBaseURL}/users/${userId}/`
    return fetchWithErrorHandling<User>(url, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json" 
        },
    });
}

async function findMultipleUsers(userIds: Array<string>) {
    const url = `${backendBaseURL}/users/`
    return fetchWithErrorHandling<Array<User>>(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ user_ids: userIds })
    });
}

export { findUser, findMultipleUsers }