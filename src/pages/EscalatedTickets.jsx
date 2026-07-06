import { useEffect, useState } from "react";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Sidebar from "../components/Sidebar";

function EscalatedTickets() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Tickets/escalated",
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


            <h2>🚨 Escalated Tickets</h2>

            <table className="table table-bordered table-hover mt-3">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Engineer</th>
                    </tr>
                </thead>

                <tbody>

                    {tickets.length > 0 ? (

                        tickets.map(ticket => (

                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.priority}</td>

                                <td>
                                    <StatusBadge status={ticket.status} />
                                </td>
                                <td>{ticket.assignedEngineer}</td>
                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="5" className="text-center">
                                No Escalated Tickets
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

            </div>

            </div>
    );
}

export default EscalatedTickets;