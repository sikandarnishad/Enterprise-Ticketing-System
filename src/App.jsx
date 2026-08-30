import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import Profile from "./pages/Profile";
import AdminTickets from "./pages/AdminTickets";
import AdminDashboard from "./pages/AdminDashboard";
import Reports from "./pages/Reports";
import EngineerTickets from "./pages/EngineerTickets";
import EngineerDashboard from "./pages/EngineerDashboard";
import EditTicket from "./pages/EditTicket";
import Navbar from "./components/Navbar";
import TicketComments from "./pages/TicketComments";
import Register from "./pages/Register";
import Engineers from "./pages/Engineers";
import Users from "./pages/Users";
import ImportUsers from "./pages/ImportUsers";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import TicketHistory from "./pages/TicketHistory";
import ExportUsers from "./pages/ExportUsers";
import EngineerPerformance from "./pages/EngineerPerformance";
import SlaDashboard from "./pages/SlaDashboard";
import AdminCharts from "./pages/AdminCharts";
import EscalatedTickets from "./pages/EscalatedTickets";
import Settings from "./pages/Settings";
import CriticalTickets from "./pages/CriticalTickets";


// ==========================================
// HOME REDIRECT
// ==========================================

function HomeRedirect() {

    const token = localStorage.getItem("token");
    const role = localStorage
        .getItem("role")
        ?.toUpperCase();

    // No login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Admin
    if (role === "ADMIN") {
        return <Navigate to="/admin" replace />;
    }

    // Engineer
    if (role === "ENGINEER") {
        return <Navigate to="/engineer" replace />;
    }

    // Customer
    if (role === "CUSTOMER") {
        return <Navigate to="/customer" replace />;
    }

    // Unknown role
    return <Navigate to="/login" replace />;
}


// ==========================================
// APP
// ==========================================

function App() {

    return (

        <BrowserRouter>

            {/* ==================================
                NAVBAR
                Visible on ALL pages
            ================================== */}

            <Navbar />


            <Routes>

                {/* ==================================
                    PUBLIC ROUTES
                ================================== */}

                {/* Root */}
                <Route
                    path="/"
                    element={<HomeRedirect />}
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ==================================
                    ADMIN ROUTES
                ================================== */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <AdminDashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin-tickets"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <AdminTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <Reports />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/engineers"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <Engineers />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <Users />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/import-users"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <ImportUsers />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/export-users"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <ExportUsers />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/engineer-performance"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <EngineerPerformance />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sla-dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <SlaDashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <AdminCharts />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/escalated"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <EscalatedTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/critical-tickets"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <CriticalTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Admin">
                                <Settings />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />


                {/* ==================================
                    ENGINEER ROUTES
                ================================== */}

                <Route
                    path="/engineer"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Engineer">
                                <EngineerDashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/engineer-tickets"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Engineer">
                                <EngineerTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />


                {/* ==================================
                    CUSTOMER ROUTES
                ================================== */}

                <Route
                    path="/customer"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Customer">
                                <CustomerDashboard />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-ticket"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Customer">
                                <CreateTicket />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-tickets"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Customer">
                                <MyTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />

                {/* Existing route */}
                <Route
                    path="/mytickets"
                    element={
                        <ProtectedRoute>
                            <RoleProtectedRoute role="Customer">
                                <MyTickets />
                            </RoleProtectedRoute>
                        </ProtectedRoute>
                    }
                />


                {/* ==================================
                    SHARED ROUTES
                ================================== */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-ticket/:id"
                    element={
                        <ProtectedRoute>
                            <EditTicket />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ticket-comments/:id"
                    element={
                        <ProtectedRoute>
                            <TicketComments />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ticket-history/:id"
                    element={
                        <ProtectedRoute>
                            <TicketHistory />
                        </ProtectedRoute>
                    }
                />


                {/* ==================================
                    FALLBACK
                ================================== */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
