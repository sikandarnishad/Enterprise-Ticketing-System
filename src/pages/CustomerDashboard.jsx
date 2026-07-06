import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function CustomerDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        //<div className="container mt-4">
        //<Sidebar/>

        <div className="d-flex">

            <Sidebar />

            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    minHeight: "100vh",
                    padding: "30px",
                    background:
                        "linear-gradient(135deg,#f8fafc,#e0f2fe,#dbeafe)"
                }}
            >


            <div className="d-flex justify-content-between align-items-center">
                <h1>Customer Dashboard</h1>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="row mt-4">

                <div className="col-md-4">

                    <div
                        className="card p-4 shadow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/create-ticket")}
                    >
                        <h4>🎫 Create Ticket</h4>
                        <p>Create a new support ticket</p>
                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card p-4 shadow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/my-tickets")}
                    >
                        <h4>📋 My Tickets</h4>
                        <p>View all your tickets</p>
                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card p-4 shadow"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/profile")}
                    >
                        <h4>👤 Profile</h4>
                        <p>View account details</p>
                    </div>

                </div>

                </div>
            </div>

        </div>
    );
}

export default CustomerDashboard;