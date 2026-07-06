import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function EngineerPerformance() {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const token =
            localStorage.getItem("token");

        const response =
            await api.get(
                "/Tickets/engineer-performance",
                {
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


            <h2>Engineer Performance</h2>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Engineer</th>
                        <th>Assigned</th>
                        <th>Resolved</th>
                    </tr>
                </thead>

                <tbody>

                    {data.map((item, index) => (

                        <tr key={index}>
                            <td>{item.engineer}</td>
                            <td>{item.totalAssigned}</td>
                            <td>{item.resolved}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

            </div>
        </div>
    );
}

export default EngineerPerformance;