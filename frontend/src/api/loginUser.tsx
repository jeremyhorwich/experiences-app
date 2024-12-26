const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function loginUser(username: string, password: string) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/authentication/login/`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({ username, password})
                }
            );

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const responseJSON = await response.json();
        return responseJSON
    } catch (error) {
        console.error("Error logging in: ", error);
    }
}

export { loginUser }