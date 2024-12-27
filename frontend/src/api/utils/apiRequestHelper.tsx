async function fetchWithErrorHandling<T>(url: string, options: RequestInit): Promise<T | null> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error during fetch:", error);
        return null;
    }
}

export { fetchWithErrorHandling } 