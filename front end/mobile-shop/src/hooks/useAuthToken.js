import { useEffect } from "react";

const useAuthToken = () => {
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const expirationTime = decodedToken.exp * 1000;
                const currentTime = Date.now();

                if (currentTime >= expirationTime) {
                    localStorage.clear();
                    window.location.href = "/login";
                } else {
                    setTimeout(() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }, expirationTime - currentTime);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.clear();
                window.location.href = "/login";
            }
        }
    }, []);
};

export default useAuthToken;
