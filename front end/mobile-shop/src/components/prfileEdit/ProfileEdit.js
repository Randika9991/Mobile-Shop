import React, { useState, useEffect } from "react";
import {getUserById, updateUserProfile} from "../../services/userService";

const EditProfileUserAdmin = () => {
    const userId = localStorage.getItem("authId");
    const authToken = localStorage.getItem("authToken");

    const [user, setUser] = useState({ name: ""||localStorage.getItem("userName"), email:""||localStorage.getItem("userEmail"), password: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!userId) {
            setMessage("User not found!");
            return;
        }

        const fetchUserData = async () => {
            try {
                const data = await getUserById(userId, authToken);
                setUser({
                    name: data.name || "",
                    email: data.email || "",
                    password: "" // Don't fetch the password for security reasons
                });

            } catch (err) {
                setMessage(err.response?.data?.message || "Error fetching user data");
            }
        };

        fetchUserData();
    }, [userId, authToken]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserProfile(userId, user);
            setMessage(response.message);

            console.log(response);

            localStorage.setItem("userName", user.name);
            localStorage.setItem("userEmail", user.email);

            setUser((prevUser) => ({
                ...prevUser,
                name: user.name,
                email: user.email
            }));
        } catch (err) {
            setMessage(err.response?.data?.message || "Update failed!");
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Profile</h2>

                    {/* Form Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block font-medium text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block font-medium text-gray-700">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="*********"
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Success Message */}
                            {message && <p className="text-green-600 text-center">{message}</p>}

                            {/* Update Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                                >
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    );
};

export default EditProfileUserAdmin;



