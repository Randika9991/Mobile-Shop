import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../layout/admin/AdminNavbar";
import axios from "axios";
import Footer from "../../../layout/Footer";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [todayNewUsers, setTodayNewUsers] = useState(0);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/getAllUsers", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUsers(response.data.users);
                    setTotalUsers(response.data.totalUsers);
                    setTodayNewUsers(response.data.newUsersCount);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="">
            <AdminNavbar />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Users</h1>

                {/* User Statistics */}
                <div className="flex space-x-4 mb-6">
                    <div className="bg-white shadow-md rounded-lg p-4 w-1/2 text-center">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 w-1/2 text-center">
                        <h2 className="text-lg font-semibold">Today's Logins</h2>
                        <p className="text-2xl font-bold">{todayNewUsers}</p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 text-left">Id</th>
                                <th className="p-3 text-center">Name</th>
                                <th className="p-3 text-center">Email</th>
                                <th className="p-3 text-center">Created At</th>
                                <th className="p-3 text-center">Last Login</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 text-center">{user.name}</td>
                                    <td className="p-3 text-center">{user.email}</td>
                                    <td className="p-3 text-center">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-center">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    <Footer />
</div>
    );
};

export default AdminDashboard;
