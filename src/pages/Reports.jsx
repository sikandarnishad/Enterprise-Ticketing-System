import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function Reports() {

    const [report, setReport] = useState({});

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/Tickets/report",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setReport(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const pieData = {
        labels: [
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ],
        datasets: [
            {
                data: [
                    report.openTickets || 0,
                    report.inProgressTickets || 0,
                    report.resolvedTickets || 0,
                    report.closedTickets || 0
                ],
                backgroundColor: [
                    "#ffc107",
                    "#0d6efd",
                    "#198754",
                    "#212529"
                ]
            }
        ]
    };

    const barData = {
        labels: [
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ],
        datasets: [
            {
                label: "Tickets",
                data: [
                    report.openTickets || 0,
                    report.inProgressTickets || 0,
                    report.resolvedTickets || 0,
                    report.closedTickets || 0
                ],
                backgroundColor: [
                    "#ffc107",
                    "#0d6efd",
                    "#198754",
                    "#212529"
                ]
            }
        ]
    };

    return (
        //<div className="container mt-4">
        //    <Sidebar />

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

                <h2>📊 Reports Dashboard</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>

            </div>

            <div className="row g-4">

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-4">
                        <h6>Total Tickets</h6>
                        <h1 className="text-primary">
                            {report.totalTickets || 0}
                        </h1>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-4">
                        <h6>Open Tickets</h6>
                        <h1 className="text-warning">
                            {report.openTickets || 0}
                        </h1>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-4">
                        <h6>In Progress</h6>
                        <h1 className="text-info">
                            {report.inProgressTickets || 0}
                        </h1>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-4">
                        <h6>Resolved</h6>
                        <h1 className="text-success">
                            {report.resolvedTickets || 0}
                        </h1>
                    </div>
                </div>

            </div>

            <div className="row mt-5">

                <div className="col-md-6">

                    <div className="card shadow border-0 p-4">

                        <h5 className="mb-4">
                            Ticket Status Distribution
                        </h5>

                        <Pie data={pieData} />

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow border-0 p-4">

                        <h5 className="mb-4">
                            Ticket Statistics
                        </h5>

                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }}
                        />

                    </div>

                </div>

            </div>

            </div>
        </div>


    );
}

export default Reports;