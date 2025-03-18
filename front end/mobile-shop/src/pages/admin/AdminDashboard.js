import React from "react";
import AdminNavbar from "../../layout/admin/AdminNavbar";

const AdminDashboard = () => {
    return (
        <div className="bg-gray-100 h-screen overflow-hidden flex flex-col">
            <AdminNavbar />
            <div className="flex-1 overflow-auto">
                <div className="flex items-center justify-center max-w-5xl mx-auto min-h-full">
                    <h1 className="text-4xl font-bold text-indigo-600">Welcome to the Admin Dashboard!</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
