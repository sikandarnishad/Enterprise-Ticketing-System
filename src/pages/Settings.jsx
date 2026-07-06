import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Settings() {

    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {

        if (!darkMode) {
            document.body.style.backgroundColor = "#1e1e1e";
            document.body.style.color = "white";
        } else {
            document.body.style.backgroundColor = "#f5f5f5";
            document.body.style.color = "black";
        }

        setDarkMode(!darkMode);
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

            <h2>Settings</h2>

            <div className="card p-4 shadow">
                <h5>Theme Settings</h5>

                <button
                    className="btn btn-dark"
                    onClick={toggleTheme}
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

            </div>
            </div>
        </div>
    );
}

export default Settings;