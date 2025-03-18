import React, { useState } from "react";
import { Link } from "react-router-dom"; // useHistory for redirecting after login
import { useNavigate } from "react-router-dom";
import {userLogin} from "../../services/userService";
import {Logo} from "../../components/Logo";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);  // To show error message if login fails

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            const data = await userLogin(email, password);

            localStorage.setItem("authId", data.id);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userRole", data.role);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);

            if (data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        } catch (error) {
            if (error) {
                setError(error || "Login failed. Please try again.");
                console.log(error);
            } else if (error.request) {
                setError("No response from server. Please check your connection.");
            } else {

            }
        }
    };

    return (

        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-600 flex items-center justify-center space-x-2">
                    <Logo />
                    <span>Log In</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-sm text-red-500 mt-2">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 font-semibold">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
