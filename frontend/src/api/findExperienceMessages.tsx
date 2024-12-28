import { Message } from "../dataTypes/messages";
import { fetchWithErrorHandling } from "./utils/apiRequestHelper";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function findExperienceMessages(experienceId: string, pageNumber: number, pageSize: number) {
    const url = `${backendBaseURL}/experiences/${experienceId}/messages/`
    const queryParams = `?page_number=${pageNumber}&page_size=${pageSize}`

    return fetchWithErrorHandling<Array<Message>>(url + queryParams, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json" 
        },
    });
}

export { findExperienceMessages }