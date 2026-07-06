import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/DashboardCard";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardCharts from "../components/DashboardCharts";


function AdminDashboard() {

    const navigate = useNavigate();

    const [report, setReport] = useState({});

    const [userStats, setUserStats] = useState({});

    const [criticalCount, setCriticalCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [recentTickets, setRecentTickets] = useState([]);

    const [priorityStats, setPriorityStats] = useState({});








    useEffect(() => {
        loadReport();
        loadUserStats();
    }, []);

    useEffect(() => {
        loadDashboard();
        loadUserStats();
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

            setReport(response.data);

        } catch (error) {
            console.log(error);
        }
    };




    const loadUserStats = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/Roles/dashboard-stats",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setUserStats(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const loadDashboard = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/Tickets/report", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const criticalResponse = await api.get(
                "/Tickets/critical-count",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const recentResponse = await api.get(
                "/Tickets/recent",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const priorityResponse = await api.get(
    "/Tickets/priority-stats",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

            setRecentTickets(recentResponse.data);

            setReport(response.data);
            setCriticalCount(criticalResponse.data);
            setPriorityStats(priorityResponse.data);

            setLoading(false);

        } catch (error) {
            console.log(error);

            setLoading(false);
        }
    };


    if (loading) {
        return <LoadingSpinner />;
    }

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
      "linear-gradient(135deg,#f8fafc 0%,#e0f2fe 50%,#dbeafe 100%)"
}}
    
>
                <h1 className="mb-4">Admin Dashboard</h1>
                <div className="alert alert-info">
                    Welcome Admin 👋 Manage tickets, users and reports from here.
                </div>

            {/* Statistics Cards */}

            <div className="row mb-4">

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-3">
                        <h6>Total Tickets</h6>
                        <h2 className="text-primary">
                            {report.totalTickets || 0}
                        </h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-3">
                        <h6>Open Tickets</h6>
                        <h2 className="text-warning">
                            {report.openTickets || 0}
                        </h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-3">
                        <h6>Resolved Tickets</h6>
                        <h2 className="text-success">
                            {report.resolvedTickets || 0}
                        </h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow border-0 text-center p-3">
                        <h6>Closed Tickets</h6>
                        <h2 className="text-dark">
                            {report.closedTickets || 0}
                        </h2>
                    </div>
                </div>

            </div>


            <div className="row mb-4">

    <div className="col-md-3">
        <div className="card shadow text-center p-3">
            <h6>Critical</h6>
            <h2 className="text-danger">
                {priorityStats.critical || 0}
            </h2>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card shadow text-center p-3">
            <h6>High</h6>
            <h2 className="text-warning">
                {priorityStats.high || 0}
            </h2>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card shadow text-center p-3">
            <h6>Medium</h6>
            <h2 className="text-primary">
                {priorityStats.medium || 0}
            </h2>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card shadow text-center p-3">
            <h6>Low</h6>
            <h2 className="text-success">
                {priorityStats.low || 0}
            </h2>
        </div>
    </div>

</div>





            {/* Dashboard Features */}

            <div className="row g-4">

                <DashboardCard
                    title="Manage Tickets"
                    description="View and manage all tickets"
                    icon="🎫"
                    onClick={() => navigate("/admin-tickets")}
                />

                <DashboardCard
                    title="Reports"
                    description="System statistics & analytics"
                    icon="📊"
                    onClick={() => navigate("/reports")}
                />

                <DashboardCard
                    title="Engineers"
                    description="Manage assigned engineers"
                    icon="👨‍💻"
                    onClick={() => navigate("/engineers")}
                />

                    <DashboardCard
                        title="Settings"
                        description="System configuration"
                        icon="⚙️"
                        onClick={() => navigate("/settings")}
                    />

                <DashboardCard
                    title="Users"
                    description="Create Customer & Engineer Accounts"
                    icon="👤"
                    onClick={() => navigate("/register")}
                />

                <DashboardCard
                    title="Import Users"
                    description="Upload Excel and Create Users"
                    icon="📥"
                    onClick={() => navigate("/import-users")}
                />

                <DashboardCard
                    title="Export Users"
                    description="Download Users Excel File"
                    icon="📤"
                    onClick={() => navigate("/export-users")}
                />

                <DashboardCard
                    title="Performance"
                    description="Engineer Statistics"
                    icon="🏆"
                    onClick={() => navigate("/engineer-performance")}
                />

                <DashboardCard
                    title="SLA Dashboard"
                    description="Track overdue tickets"
                    icon="⏰"
                    onClick={() => navigate("/sla-dashboard")}
                />

                <DashboardCard
                    title="Critical Tickets"
                    description="High Priority Open Tickets"
                    icon="🚨"
                    value={criticalCount}
                    onClick={() => navigate("/critical-tickets")}
                />

                <DashboardCard
                    title="Escalated"
                    description="Critical Open Tickets"
                    icon="🚩"
                    onClick={() => navigate("/escalated")}
                />

                <DashboardCard
                    title="Analytics"
                    description="Charts & Insights"
                    icon="📈"
                    onClick={() => navigate("/analytics")}
                />

                </div>
                <DashboardCharts />


            <div className="row mt-3 g-4">

                <div className="col-md-3">
                    <div className="card p-4 shadow text-center">
                        <h6>Total Users</h6>
                        <h2>{userStats.totalUsers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-4 shadow text-center">
                        <h6>Customers</h6>
                        <h2>{userStats.totalCustomers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-4 shadow text-center">
                        <h6>Engineers</h6>
                        <h2>{userStats.totalEngineers}</h2>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card p-4 shadow text-center">
                        <h6>Admins</h6>
                        <h2>{userStats.totalAdmins}</h2>
                    </div>
                </div>

                </div>

                <div className="card shadow mt-4">
                    <div className="card-header">
                        <h5>Recent Tickets</h5>
                    </div>

                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentTickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.id}</td>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.priority}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;