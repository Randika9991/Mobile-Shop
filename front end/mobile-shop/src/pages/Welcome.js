import React from "react";
import WelcomeNavBar from "../layout/WelcomeNavBar";

const WelcomePage = () => {
    return (
        <div>
            <WelcomeNavBar />
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-4xl font-bold text-indigo-600">Welcome to My React App!</h1>
            </div>
        </div>
    );
};

export default WelcomePage;
