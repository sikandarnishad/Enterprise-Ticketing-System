import { BrowserRouter, Routes, Route } from "react-router-dom";

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
//import MyTickets from "./pages/MyTickets";
//<Route
//    path="/mytickets"
//    element={<MyTickets />}
///>
function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Public Routes */}



<Route
    path="/critical-tickets"
    element={<CriticalTickets />}
                />

                <Route
                    path="/mytickets"
                    element={<MyTickets />}
                />


                <Route
                    path="/escalated"
                    element={<EscalatedTickets />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/sla-dashboard"
                    element={<SlaDashboard />}
                />
                <Route
                    path="/analytics"
                    element={<AdminCharts />}
                />

                <Route
                    path="/export-users"
                    element={<ExportUsers />}
                />

                <Route
                    path="/engineer-performance"
                    element={<EngineerPerformance />}
                />

                <Route
                    path="/import-users"
                    element={<ImportUsers />}
                />

                <Route
                    path="/ticket-history/:id"
                    element={<TicketHistory />}
                />

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Admin Routes */}

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

                {/* Engineer Routes */}

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

                {/* Customer Routes */}

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

                {/* Shared Routes */}

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;