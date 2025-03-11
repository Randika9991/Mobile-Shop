import React from "react";
import UserNavBar from "../../layout/user/UserNavBar";

const UserDashboard = () => {
    return (
        <div>
            <UserNavBar />
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-bold text-indigo-600">Welcome  User dashboard!</h1>
            </div>
        </div>
    );
};

export default UserDashboard;
