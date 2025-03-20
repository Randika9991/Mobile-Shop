import React from "react";

const Footer = () => {

    return (
        <>
            <footer className="bg-gray-800 text-white text-center  mt-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
            </footer>
        </>
    )
};

export default Footer;
