import { Link, useNavigate } from "react-router-dom";
import regalLogo from "../assets/regal.png";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {

    const [criticalCount, setCriticalCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);

    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    useEffect(() => {
        loadCriticalCount();
    }, []);

    const loadCriticalCount = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const response = await api.get(
                "/Tickets/critical-count",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCriticalCount(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

            <div className="container">

                <Link
                    className="navbar-brand d-flex align-items-center gap-2"
                    to="/"
                >
                    <img
                        src={regalLogo}
                        alt="Regal Infotect"
                        style={{
                            height: "45px",
                            borderRadius: "5px"
                        }}
                    />

                    <span className="fw-bold">
                        Ticketing System
                    </span>
                </Link>

                <div className="d-flex align-items-center gap-3">

                    {username && localStorage.getItem("token") && (
                        <>
                           <div
    style={{
        cursor: "pointer",
        fontSize: "20px",
        position: "relative"
    }}
    style={{
    position: "sticky",
    top: 0,
    zIndex: 999
}}
    onClick={() =>
        setShowNotifications(!showNotifications)
    }
>
    🔔

    <span className="badge bg-danger ms-1">
        {criticalCount}
    </span>

    {showNotifications && (
        <div
            className="card shadow"
            style={{
                position: "absolute",
                top: "35px",
                right: "0",
                width: "300px",
                zIndex: 9999
            }}
        >
            <div className="card-body">
                <h6>Notifications</h6>

                <hr />

                <p>
                    🚨 {criticalCount} Critical Tickets
                </p>

                <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                        navigate("/critical-tickets")
                    }
                >
                    View Tickets
                </button>
            </div>
        </div>
    )}
</div>

                            <span className="text-light">
                                Welcome, <b>{username}</b>
                            </span>

                            <span className="badge bg-info text-dark">
                                {role}
                            </span>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;