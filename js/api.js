export const apiRequest = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token"); // Ambil token
    const headers = { Authorization: `Bearer ${token}` };

    if (body) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(`http://localhost:5001/api${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};
