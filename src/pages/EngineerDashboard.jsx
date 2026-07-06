import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function EngineerDashboard() {
    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");

            const response = await api.get(
                `/Tickets/assigned/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTickets(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
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

                    <h1>Engineer Dashboard</h1>

                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.clear();
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>

                </div>

                {/* Statistics */}

                <div className="row mt-4">

                    <div className="col-md-4">
                        <div className="card shadow border-0 text-center p-4">
                            <h6>Total Assigned</h6>
                            <h2 className="text-primary">
                                {tickets.length}
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 text-center p-4">
                            <h6>Open Tickets</h6>
                            <h2 className="text-warning">
                                {
                                    tickets.filter(
                                        t => t.status === "Open"
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 text-center p-4">
                            <h6>Resolved Tickets</h6>
                            <h2 className="text-success">
                                {
                                    tickets.filter(
                                        t => t.status === "Resolved"
                                    ).length
                                }
                            </h2>
                        </div>
                    </div>

                </div>

                {/* Dashboard Cards */}

                <div className="row mt-5">

                    <div className="col-md-6">

                        <div
                            className="card p-4 shadow-lg border-0"
                            style={{
                                cursor: "pointer",
                                transition: ".3s"
                            }}
                            onClick={() =>
                                navigate("/engineer-tickets")
                            }
                        >
                            <h4>📋 Assigned Tickets</h4>

                            <p className="text-muted">
                                View and update assigned tickets
                            </p>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div
                            className="card p-4 shadow-lg border-0"
                            style={{
                                cursor: "pointer",
                                transition: ".3s"
                            }}
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            <h4>👤 Profile</h4>

                            <p className="text-muted">
                                View profile details
                            </p>

                        </div>

                    </div>

                </div>

                {/* Recent Tickets */}

                <div className="card shadow-lg border-0 mt-5">

                    <div className="card-header bg-white">

                        <h5 className="mb-0">
                            Recent Assigned Tickets
                        </h5>

                    </div>

                    <div className="card-body">

                        {
                            tickets.length === 0 ? (

                                <div className="text-center text-muted py-4">

                                    No Assigned Tickets

                                </div>

                            ) : (

                                <table className="table table-hover">

                                    <thead>

                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Priority</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            tickets
                                                .slice(0, 5)
                                                .map(ticket => (

                                                    <tr key={ticket.id}>

                                                        <td>
                                                            {ticket.id}
                                                        </td>

                                                        <td>
                                                            {ticket.title}
                                                        </td>

                                                        <td>
                                                            {ticket.status}
                                                        </td>

                                                        <td>
                                                            {ticket.priority}
                                                        </td>

                                                    </tr>

                                                ))
                                        }

                                    </tbody>

                                </table>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EngineerDashboard;