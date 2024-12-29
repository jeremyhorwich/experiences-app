import { Experience } from "../dataTypes/experiences";
import { fetchWithErrorHandling } from "./utils/apiRequestHelper";

const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

type ApiResponse = {
    results: Array<Experience>,
    page: number,
    page_size: number,
    total_count: number,
    total_pages: number
}

async function findExperiences(userId: string, page: number, pageSize: number) {
    const url = `${backendBaseURL}/users/${userId}/experiences/`
    const queryParams = `?page=${page}&pageSize=${pageSize}`

    return fetchWithErrorHandling<ApiResponse>(url + queryParams, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json" 
        },
    });
}

export { findExperiences }