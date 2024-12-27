const backendBaseURL = import.meta.env.VITE_BACKEND_BASE_URL;

async function updateUserRating(userId: string, incrementValue: number) {
    try {
        const response = 
            await fetch(
                `${backendBaseURL}/users/${userId}/update-rating/`, {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({ increment_value: incrementValue })
                }
            );

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const responseJSON = await response.json();
        return responseJSON
    } catch (error) {
        console.error("Error updating user rating: ", error);
    }
}

export { updateUserRating }