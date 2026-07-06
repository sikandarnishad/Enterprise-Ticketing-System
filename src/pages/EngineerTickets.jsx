import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function EngineerTickets() {

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

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            const ticket = tickets.find(
                (t) => t.id === id
            );

            await api.put(
                `/Tickets/${id}`,
                {
                    ...ticket,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadTickets();

        } catch (error) {
            console.log(error);
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


            <h2>Assigned Tickets</h2>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {tickets.map((ticket) => (

                        <tr key={ticket.id}>

                            <td>{ticket.id}</td>

                            <td>{ticket.title}</td>

                            <td>
                                <span
                                    className={
                                        ticket.status === "Open"
                                            ? "badge bg-warning text-dark"
                                            : ticket.status === "In Progress"
                                                ? "badge bg-primary"
                                                : ticket.status === "Resolved"
                                                    ? "badge bg-success"
                                                    : "badge bg-dark"
                                    }
                                >
                                    {ticket.status}
                                </span>
                            </td>

                            <td>{ticket.priority}</td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() =>
                                        updateStatus(
                                            ticket.id,
                                            "In Progress"
                                        )
                                    }
                                >
                                    Start
                                </button>

                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() =>
                                        updateStatus(
                                            ticket.id,
                                            "Resolved"
                                        )
                                    }
                                >
                                    Resolve
                                </button>

                                <button
                                    className="btn btn-dark btn-sm me-2"
                                    onClick={() =>
                                        updateStatus(
                                            ticket.id,
                                            "Closed"
                                        )
                                    }
                                >
                                    Close
                                </button>

                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() =>
                                        navigate(
                                            `/ticket-comments/${ticket.id}`
                                        )
                                    }
                                >
                                    Comments
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </div>
        </div>
    );
}

export default EngineerTickets;