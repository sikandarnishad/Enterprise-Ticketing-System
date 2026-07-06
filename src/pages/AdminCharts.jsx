import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function AdminCharts() {

    const [report, setReport] = useState({});
    const [performance, setPerformance] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const token = localStorage.getItem("token");

        const reportRes = await api.get(
            "/Tickets/report",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const perfRes = await api.get(
            "/Tickets/engineer-performance",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setReport(reportRes.data);
        setPerformance(perfRes.data);
    };

    const pieData = {
        labels: [
            "Open",
            "Resolved",
            "Closed"
        ],
        datasets: [
            {
                data: [
                    report.openTickets || 0,
                    report.resolvedTickets || 0,
                    report.closedTickets || 0
                ]
            }
        ]
    };

    const barData = {
        labels: performance.map(x => x.engineer),
        datasets: [
            {
                label: "Assigned Tickets",
                data: performance.map(
                    x => x.totalAssigned
                )
            }
        ]
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

            <h2>Analytics Dashboard</h2>

            <div className="row">

                <div className="col-md-6">
                    <div className="card p-3 shadow">
                        <h5>Ticket Status</h5>
                        <Pie data={pieData} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card p-3 shadow">
                        <h5>Engineer Performance</h5>
                        <Bar data={barData} />
                    </div>
                </div>

                </div>
            </div>

        </div>
    );
}

export default AdminCharts;