import api from "../services/api";
import Sidebar from "../components/Sidebar";

function ExportUsers() {

    const exportUsers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/Roles/export-users",
                    {
                        responseType: "blob",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;
            link.download = "Users.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert("Export Failed");
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


            <h2>Export Users</h2>

            <button
                className="btn btn-success mt-3"
                onClick={exportUsers}
            >
                Download Users Excel
            </button>

            </div>
        </div>
    );
}

export default ExportUsers;