export const apiRequest = async (endpoint, method = "GET", body = null) => {
    const token = localStorage.getItem("token"); // Ambil token
    const headers = { Authorization: `Bearer ${token}` };

    if (body) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const response = await fetch(`https://engsight-be-production.up.railway.app/api${endpoint}`, {
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

export const fetchTestResults = async (userId) => {
    try {
        const response = await fetch(`https://engsight-be-production.up.railway.app/api/test-results/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch test results");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching test results:", error);
        throw error;
    }
};
