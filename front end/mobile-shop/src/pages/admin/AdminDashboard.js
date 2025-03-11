import React from "react";
import AdminNavbar from "../../layout/admin/AdminNavbar";

const AdminDashboard = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-bold text-indigo-600">Welcome  admin dashboard!</h1>
            </div>
        </div>
    );
};

export default AdminDashboard;
