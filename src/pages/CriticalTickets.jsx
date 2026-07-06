import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function CriticalTickets() {

    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Tickets/critical",
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

    const loadTicket = async (id) => {

        try {

            const token = localStorage.getItem("token");

            // Ticket Details
            const response = await api.get(
                `/Tickets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSelectedTicket(response.data);

            // Ticket Comments
            try {

                const commentResponse = await api.get(
                    `/TicketComments/ticket/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setComments(commentResponse.data);

            } catch (commentError) {

                console.log("Comments API Error", commentError);
                setComments([]);
            }

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

            <h2 className="mb-4">
                🚨 Critical Tickets
            </h2>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>

                <tbody>

                    {tickets.map(ticket => (

                        <tr key={ticket.id}>

                            <td>{ticket.id}</td>

                            <td
                                style={{
                                    cursor: "pointer",
                                    color: "blue"
                                }}
                                onClick={() => loadTicket(ticket.id)}
                            >
                                {ticket.title}
                            </td>

                            <td>{ticket.status}</td>
                            <td>{ticket.priority}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {
                selectedTicket && (

                    <div className="card mt-4 shadow">

                        <div className="card-body">

                            <h4>Ticket Details</h4>

                            <hr />

                            <p>
                                <b>ID:</b> {selectedTicket.id}
                            </p>

                            <p>
                                <b>Title:</b> {selectedTicket.title}
                            </p>

                            <p>
                                <b>Status:</b> {selectedTicket.status}
                            </p>

                            <p>
                                <b>Priority:</b> {selectedTicket.priority}
                            </p>

                            <hr />

                            <h5>Comments</h5>

                            {
                                comments.length === 0 ? (
                                    <p>No Comments</p>
                                ) : (
                                    <ul className="list-group mb-3">

                                        {
                                            comments.map(comment => (

                                                <li
                                                    key={comment.id}
                                                    className="list-group-item"
                                                >
                                                    {comment.commentText}
                                                </li>

                                            ))
                                        }

                                    </ul>
                                )
                            }

                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setSelectedTicket(null);
                                    setComments([]);
                                }}
                            >
                                Close
                            </button>

                        </div>

                    </div>
                )
            }
            </div>
        </div>
    );
}

export default CriticalTickets;