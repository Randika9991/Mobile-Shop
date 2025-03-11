import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === allowedRole) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
