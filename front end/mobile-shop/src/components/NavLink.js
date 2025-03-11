import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            className="text-sm font-semibold text-gray-800 hover:text-[#FFAA33] transition"
        >
            {children}
        </Link>
    );
};

export default NavLink;
