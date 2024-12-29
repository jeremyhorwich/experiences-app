import { Message } from "../dataTypes/messages";
import { fetchWithErrorHandling } from "./utils/apiRequestHelper";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function sendNewMessage(experienceId: string, message: Message) {
    const url = `${backendBaseURL}/experiences/${experienceId}/messages/`

    return fetchWithErrorHandling<Array<Message>>(url, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({new_message: message})
    });
}

export { sendNewMessage }