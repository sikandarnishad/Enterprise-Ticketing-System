import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, role }) {

    const userRole = localStorage.getItem("role");

    // Case-insensitive role comparison
    const normalizedUserRole = userRole?.trim().toLowerCase();
    const normalizedRequiredRole = role?.trim().toLowerCase();

    console.log("ROLE FROM STORAGE =", userRole);
    console.log("REQUIRED ROLE =", role);
    console.log("NORMALIZED USER ROLE =", normalizedUserRole);
    console.log("NORMALIZED REQUIRED ROLE =", normalizedRequiredRole);

    // No role/token → login page
    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    // Role matches → allow dashboard
    if (normalizedUserRole === normalizedRequiredRole) {
        return children;
    }

    // Wrong role → login page
    return <Navigate to="/" replace />;
}

export default RoleProtectedRoute;
