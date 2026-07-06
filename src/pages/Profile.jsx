import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";

function Profile() {

    const token = localStorage.getItem("token");

    const decoded = jwtDecode(token);

    const username =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

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


            <h2>Profile</h2>

            <div className="card p-4 shadow">

                <h4>
                    Username: {username}
                </h4>

                <hr />

                <h4>
                    Role: {role}
                </h4>

            </div>

            </div>
        </div>
    );
}

export default Profile;