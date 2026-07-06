import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
function SlaDashboard() {

    const [data, setData] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const token =
            localStorage.getItem("token");

        const response =
            await api.get("/Tickets/sla", {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });

        setData(response.data);
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


            <h2>SLA Dashboard</h2>

            <div className="row mt-4">

                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h5>Overdue Tickets</h5>
                        <h2>{data.overdueTickets}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h5>Due Today</h5>
                        <h2>{data.dueToday}</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h5>Avg Resolution Days</h5>
                        <h2>{data.avgResolutionTime}</h2>
                    </div>
                </div>

            </div>

            </div>
        </div>
    );
}

export default SlaDashboard;