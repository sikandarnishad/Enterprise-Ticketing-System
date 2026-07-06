import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, role }) {

    const userRole = localStorage.getItem("role");

    return userRole === role
        ? children
        : <Navigate to="/" />;
}

export default RoleProtectedRoute;