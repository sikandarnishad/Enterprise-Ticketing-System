import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";
import Sidebar from "../components/Sidebar";


function AdminTickets() {

    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);
    const [engineers, setEngineers] = useState([]);
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedTicketId, setSelectedTicketId] =
        useState(null);

    useEffect(() => {
        loadTickets();
        loadEngineers();
    }, []);

    const loadTickets = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/Tickets", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTickets(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const loadEngineers = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Roles/engineers",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEngineers(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteTicket = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/Tickets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Ticket Deleted");

            loadTickets();

        } catch (error) {

            console.log(error);
            alert("Delete Failed");
        }
    };

    const confirmDelete = async () => {

        await deleteTicket(selectedTicketId);

        setShowDeleteModal(false);

        setSelectedTicketId(null);
    };

    const assignEngineer = async (id, engineerName) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/Tickets/assign/${id}`,
                JSON.stringify(engineerName),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert("Engineer Assigned");

            loadTickets();

        } catch (error) {

            console.log(error);
            alert("Assign Failed");
        }
    };

    return (
        //<div className="container mt-4">
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


            <h2 className="mb-4">All Tickets</h2>

            {/* Search */}

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Ticket..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Filters */}

            <div className="row mb-4">

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                    >
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>

                </div>

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(e.target.value)
                        }
                    >
                        <option value="">All Category</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Network">Network</option>
                        <option value="Printer">Printer</option>
                    </select>

                </div>

            </div>

            <ConfirmModal
                show={showDeleteModal}
                title="Delete Ticket"
                message="Are you sure you want to delete this ticket?"
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            <table className="table table-striped table-hover shadow">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Category</th>
                        <th>Attachment</th>
                        <th>Assigned Engineer</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {tickets
                        .filter(ticket =>
                            ticket.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .filter(ticket =>
                            statusFilter === "" ||
                            ticket.status === statusFilter
                        )
                        .filter(ticket =>
                            priorityFilter === "" ||
                            ticket.priority === priorityFilter
                        )
                        .filter(ticket =>
                            categoryFilter === "" ||
                            ticket.category === categoryFilter
                        )
                        .map((ticket) => (

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
                                        <StatusBadge status={ticket.status} />


                                    </span>

                                </td>

                                <td>{ticket.priority}</td>

                                <td>

                                    <span className="badge bg-secondary">
                                        {ticket.category}
                                    </span>

                                </td>

                                <td>

                                    {ticket.attachmentPath ? (

                                        <a
                                            href={`https://localhost:7035/uploads/${ticket.attachmentPath}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-info btn-sm"
                                        >
                                            View File
                                        </a>

                                    ) : (

                                        <span className="text-muted">
                                            No File
                                        </span>

                                    )}

                                </td>

                                <td>

                                    <span className="badge bg-info text-dark">
                                        {ticket.assignedEngineer || "Not Assigned"}
                                    </span>

                                    <select
                                        className="form-select form-select-sm mt-2"
                                        value={ticket.assignedEngineer || ""}
                                        onChange={(e) =>
                                            assignEngineer(
                                                ticket.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Engineer
                                        </option>

                                        {engineers.map((eng) => (

                                            <option
                                                key={eng}
                                                value={eng}
                                            >
                                                {eng}
                                            </option>

                                        ))}

                                    </select>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/edit-ticket/${ticket.id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/ticket-comments/${ticket.id}`)
                                        }
                                    >
                                        Comments
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            setSelectedTicketId(ticket.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-secondary btn-sm me-2"
                                        onClick={() =>
                                            navigate(
                                                `/ticket-history/${ticket.id}`
                                            )
                                        }
                                    >
                                        History
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

export default AdminTickets;