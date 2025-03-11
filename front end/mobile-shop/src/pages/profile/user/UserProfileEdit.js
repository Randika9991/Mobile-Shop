import { useState, useEffect } from "react";
import UserNavBar from "../../../layout/user/UserNavBar";
import {getUserById, updateUserProfile} from "../../../services/userService";

const EditProfile = () => {
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
            <UserNavBar />
            <div className="flex justify-center items-center min-h-screen bg-[#F3F4F6]">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#111827]">Edit Profile</h2>
                    {message && <p className="text-green-500 text-center">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-[#111827] mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full p-3 border border-[#D1D5DB] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[#111827] mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full p-3 border border-[#D1D5DB] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-[#111827] mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="*********"
                                className="w-full p-3 border border-[#D1D5DB] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#2563EB] text-white p-3 rounded hover:bg-[#1E40AF] transition duration-200"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
