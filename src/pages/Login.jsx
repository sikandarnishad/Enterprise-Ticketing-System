import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/Auth/login", {
                username,
                password
            });

            const token = response.data.token;

            // =========================
            // SAVE TOKEN
            // =========================
            localStorage.setItem("token", token);

            // =========================
            // DECODE JWT
            // =========================
            const decoded = jwtDecode(token);

            console.log("TOKEN =", token);
            console.log("DECODED =", decoded);

            // =========================
            // SAVE USERNAME
            // =========================
            const loggedInUser =
                decoded["unique_name"] || username;

            localStorage.setItem(
                "username",
                loggedInUser
            );

            // =========================
            // GET ROLE FROM JWT
            // =========================
            const roles =
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];

            const role = Array.isArray(roles)
                ? roles[0]
                : roles;

            // Normalize role
            const normalizedRole =
                role?.toLowerCase();

            console.log("ROLE =", role);
            console.log("NORMALIZED ROLE =", normalizedRole);

            // Save role
            localStorage.setItem(
                "role",
                normalizedRole
            );

            // =========================
            // REDIRECT BY ROLE
            // =========================

            if (normalizedRole === "admin") {

                navigate("/admin", { replace: true });

            }
            else if (normalizedRole === "engineer") {

                navigate("/engineer", { replace: true });

            }
            else if (normalizedRole === "customer") {

                navigate("/customer", { replace: true });

            }
            else {

                console.error(
                    "Unknown role:",
                    role
                );

                alert("User role not recognized.");
                navigate("/", { replace: true });
            }

        }
        catch (error) {

            console.error(
                "Login Error:",
                error
            );

            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Ticketing System Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Login
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
