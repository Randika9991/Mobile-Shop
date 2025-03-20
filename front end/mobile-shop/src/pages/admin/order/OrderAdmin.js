import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../../layout/admin/AdminNavbar";
import UserNavBar from "../../../layout/user/UserNavBar";
import Footer from "../../../layout/Footer";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/admin/orders", {
                headers: { Authorization: `Bearer ${token}` }  // Pass token in headers
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <AdminNavbar />
            <div className="p-12">
            <h2 className="text-2xl font-bold mb-6">All Orders</h2>

            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">User</th>
                        <th className="p-3 text-left">Total Price</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-b">
                            <td className="p-3">{order._id}</td>
                            <td className="p-3">{order.userId?.name || "N/A"} ({order.userId?.email})</td>
                            <td className="p-3">${order.totalAmount}</td>
                            <td className="p-3">
                                    <span className={`px-2 py-1 text-sm rounded-md ${order.status === "Pending" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                                        {order.status}
                                    </span>
                            </td>
                            <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminOrders;
