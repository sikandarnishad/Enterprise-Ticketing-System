import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function TicketHistory() {

    const { id } = useParams();

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    `/Tickets/history/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setHistory(response.data);

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


            <h2>Ticket History</h2>

            <div className="card p-3 shadow">

                {history.map(item => (

                    <div
                        key={item.id}
                        className="border-bottom mb-3 pb-2"
                    >
                        <h5>{item.action}</h5>

                        <small>
                            By: {item.performedBy}
                        </small>

                        <br />

                        <small>
                            {new Date(
                                item.createdDate
                            ).toLocaleString()}
                        </small>

                    </div>

                ))}

            </div>
            </div>
        </div>
    );
}

export default TicketHistory;