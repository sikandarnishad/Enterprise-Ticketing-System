import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem("role");

    const isAdmin = role === "Admin";

    const showBackButton =
        (isAdmin && location.pathname !== "/admin") ||
        (!isAdmin && location.pathname !== "/customer");

    return (
        <div
            style={{
                width: "240px",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                background: "linear-gradient(180deg,#0f172a,#1e293b)",
                color: "white",
                padding: "20px",
                zIndex: 1000,
                overflowY: "auto",
                boxShadow: "4px 0 15px rgba(0,0,0,0.2)"
            }}
        >
            <h3
                className="mb-4"
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    paddingBottom: "15px"
                }}
            >
                🎫 Ticketing System
            </h3>

            {showBackButton && (
                <button
                    className="btn btn-outline-light btn-sm mb-4 w-100"
                    onClick={() => navigate(-1)}
                >
                    ⬅ Back
                </button>
            )}

            <div className="d-flex flex-column gap-2">

                {isAdmin ? (
                    <>
                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/admin"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/admin-tickets"
                        >
                            🎫 Tickets
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/reports"
                        >
                            📊 Reports
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/engineers"
                        >
                            👨‍💻 Engineers
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/sla-dashboard"
                        >
                            ⏰ SLA Dashboard
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/analytics"
                        >
                            📈 Analytics
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/critical-tickets"
                        >
                            🚨 Critical Tickets
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/settings"
                        >
                            ⚙️ Settings
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/customer"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/create-ticket"
                        >
                            🎫 Create Ticket
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/mytickets"
                        >
                            📋 My Tickets
                        </Link>

                        <Link
                            className="text-white text-decoration-none p-2 rounded"
                            to="/profile"
                        >
                            👤 Profile
                        </Link>
                    </>
                )}

            </div>
        </div>
    );
}

export default Sidebar;