import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function ImportUsers() {

    const [file, setFile] = useState(null);

    const handleUpload = async () => {

        try {

            if (!file) {
                alert("Please Select Excel File");
                return;
            }

            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("file", file);

            const response = await api.post(
                "/Auth/import-users",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert(response.data);

            setFile(null);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Import Failed"
            );
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


            <div className="card shadow p-4">

                <h2>Import Users From Excel</h2>

                <p className="text-muted">
                    Upload Excel File (.xlsx)
                </p>

                <input
                    type="file"
                    className="form-control mt-3"
                    accept=".xlsx,.xls"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={handleUpload}
                >
                    Upload Excel
                </button>

            </div>
            </div>
        </div>
    );
}

export default ImportUsers;