import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "../../components/NavLink";
import {Logo} from "../../components/Logo";

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-[#FFEFD7] border border-gray-300 rounded-md shadow-sm hover:bg-[#FFDBA6] focus:outline-none focus:ring-2 focus:ring-[#FFAA33] transition"
            >
                {localStorage.getItem("userName") || "User"}

                <svg
                    className="ml-2 h-4 w-4 text-gray-700 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
                    {children}
                </div>
            )}
        </div>
    );
};

const AdminNavbar = () => {
    return (
        <header className="bg-white shadow-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex items-center space-x-3">
                    <Logo to="/admin/dashboard" name="Admin Panel"/>
                </div>

                {/* Use the NavLink Component */}
                <div className="hidden lg:flex lg:gap-x-10">
                    <NavLink to="/features">Features</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/company">Company</NavLink>
                </div>

                <div className="relative">
                    <Dropdown>
                        <Link to="/admin/edit/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                            Log Out
                        </button>
                    </Dropdown>
                </div>
            </nav>
        </header>
    );
};

export default AdminNavbar;
