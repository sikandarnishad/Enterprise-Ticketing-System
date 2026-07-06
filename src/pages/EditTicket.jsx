import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function EditTicket() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        assignedEngineer: ""
    });

    useEffect(() => {
        loadTicket();
    }, []);

    const loadTicket = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/Tickets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTicket(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const updateTicket = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/Tickets/${id}`,
                ticket,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Ticket Updated");

            navigate("/admin-tickets");

        } catch (error) {

            console.log(error);
            alert("Update Failed");
        }
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


            <div className="card shadow-lg p-4">

                <h2 className="mb-4">
                    Edit Ticket
                </h2>

                <form onSubmit={updateTicket}>

                    <div className="mb-3">

                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={ticket.title || ""}
                            onChange={(e) =>
                                setTicket({
                                    ...ticket,
                                    title: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={ticket.description || ""}
                            onChange={(e) =>
                                setTicket({
                                    ...ticket,
                                    description: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Status
                        </label>

                        <select
                            className="form-select"
                            value={ticket.status || ""}
                            onChange={(e) =>
                                setTicket({
                                    ...ticket,
                                    status: e.target.value
                                })
                            }
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">
                                In Progress
                            </option>
                            <option value="Resolved">
                                Resolved
                            </option>
                            <option value="Closed">
                                Closed
                            </option>
                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Priority
                        </label>

                        <select
                            className="form-select"
                            value={ticket.priority || ""}
                            onChange={(e) =>
                                setTicket({
                                    ...ticket,
                                    priority: e.target.value
                                })
                            }
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        Update
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate("/admin-tickets")
                        }
                    >
                        Cancel
                    </button>

                </form>

            </div>

            </div>
        </div>
    );
}

export default EditTicket;