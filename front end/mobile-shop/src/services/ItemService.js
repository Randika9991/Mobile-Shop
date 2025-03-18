import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const addItem = async (formData, authToken) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/addItem",
            formData,
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        return response.data;
    } catch (error) {
        // Instead of returning, THROW the error
        throw error.response?.data || new Error("Something went wrong");
    }
};

// Function to updateItem
export const updateItem = async (id,formData,authToken) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/api/itemUpdate/${id}`, // Assuming the route for updating the item
            formData,  // Send form data in the request body
            {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Authorization header
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error("Something went wrong");
    }
};


