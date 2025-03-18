import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Function to fetch user data by ID
export const getUserById = async (userId, authToken) => {
    try {
        const response = await axios.get(`${API_URL}/uerFindById/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching user data";
    }
};

// Function to update user profile
export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/profile-edit/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Update failed!";
    }
};

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed!";
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password });
        return response.data;
    } catch (error) {
        return error.response?.data;  // Return only the response data
    }
};

