import { Experience } from "../dataTypes/experiences";
import { fetchWithErrorHandling } from "./utils/apiRequestHelper";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function sendNewExperience(experience: Experience) {
    const url = `${backendBaseURL}/experiences/`

    return fetchWithErrorHandling<string>(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(experience)
    });
}

export { sendNewExperience }