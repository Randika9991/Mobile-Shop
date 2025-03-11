import React from "react";
import { Link } from "react-router-dom";
import {Logo} from "../components/Logo"; // If you are using React Router for navigation

const WelcomeNavBar = () => {
    const isLoggedIn = localStorage.getItem("authToken"); // Check if user is logged in
    const role = localStorage.getItem("userRole");
    return (
        <header className="bg-white shadow">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <Logo to="/"/>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex lg:gap-x-12">
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        Home
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        Contact
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        About
                    </a>
                </div>

                {/* Conditional Login/Logout and Dashboard */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoggedIn ? (
                        <div>
                            {role === "admin" ? (
                                <Link to="/admin/dashboard" className="text-sm font-semibold text-gray-900 mx-4">
                                    Dashboard
                                </Link>
                                ):(
                                <Link to="/user/dashboard" className="text-sm font-semibold text-gray-900 mx-4">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    ) : (
                        // If not logged in, show Login and Register links
                        <>
                            <Link to="/login" className="text-sm font-semibold text-gray-900 mx-4">
                                Log in
                            </Link>
                            <Link to="/register" className="text-sm font-semibold text-gray-900 mx-4">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default WelcomeNavBar;
