const apiUrl = "https://engsight-be-production.up.railway.app";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Simpan token ke localStorage
      localStorage.setItem("token", data.token);
      return data;
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const fetchWithAuth = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User not authenticated");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};


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
