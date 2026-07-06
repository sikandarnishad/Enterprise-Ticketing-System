import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Sidebar from "../components/Sidebar";

function MyTickets() {

    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Tickets",
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

    const filteredTickets = tickets.filter(ticket =>
        ticket.title.toLowerCase().includes(search.toLowerCase())
    );

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

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>📋 My Tickets</h2>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/customer")}
                    >
                        ⬅ Back
                    </button>

                </div>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <input
                            className="form-control"
                            placeholder="Search Ticket..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>

                </div>

                {
                    filteredTickets.length === 0 ?

                        (

                            <div className="alert alert-info text-center shadow">

                                <h5>No Tickets Found</h5>

                                <p className="mb-0">
                                    You haven't created any ticket yet.
                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="card shadow">

                                <div className="card-body">

                                    <table className="table table-hover align-middle">

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

                                            {

                                                filteredTickets.map(ticket => (

                                                    <tr key={ticket.id}>

                                                        <td>
                                                            {ticket.id}
                                                        </td>

                                                        <td>
                                                            {ticket.title}
                                                        </td>

                                                        <td>
                                                            <StatusBadge
                                                                status={ticket.status}
                                                            />
                                                        </td>

                                                        <td>

                                                            <span
                                                                className={
                                                                    ticket.priority === "Critical"
                                                                        ? "badge bg-danger"
                                                                        : ticket.priority === "High"
                                                                            ? "badge bg-warning text-dark"
                                                                            : ticket.priority === "Medium"
                                                                                ? "badge bg-primary"
                                                                                : "badge bg-success"
                                                                }
                                                            >
                                                                {ticket.priority}
                                                            </span>

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-info btn-sm"
                                                                onClick={() =>
                                                                    navigate(`/ticket-comments/${ticket.id}`)
                                                                }
                                                            >
                                                                Comments
                                                            </button>

                                                        </td>

                                                    </tr>

                                                ))

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        )

                }

            </div>

        </div>

    );

}

export default MyTickets;